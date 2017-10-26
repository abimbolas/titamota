<template lang="pug">
  textarea(
    spellcheck="false"
    rows="1"
    ref="textarea"
    @input="updateValue($event)"
    @keydown.enter="keepValue($event)"
    @keyup.enter="onSubmit"
    :value="joinedList"
    v-focus-and-select-range="focusSelectionRangeOptions"
    :placeholder="placeholder")
</template>

<script>
  import autosize from 'autosize'
  import debounce from '@/utils/debounce'
  import { focusAndSelectRange } from '@/directives/focus'
  import bus from '@/event-bus'
  import { taskDelimiter } from '@/store/ui'

  function parseList (list) {
    return (typeof list === 'string' ? list.split(taskDelimiter) : list)
      .map(item => item.replace(/\n/g, '').trim())
      .filter(item => item)
  }

  export default {
    data () {
      return {
        debounceUpdate: debounce(),
        focusOnActive: false,
        focusedOnce: false,
        doNotUpdate: false,
        cachedEnter: ''
      }
    },

    props: [
      'value',
      'placeholder',
      'debounce',
      'onSubmit',
      'focus',
      'resetFocusOn'
    ],

    mounted () {
      autosize(this.$el)
      bus.$on(this.resetFocusOn, () => {
        this.focusedOnce = false
      })
      this.$store.subscribe(mutation => {
        let t = mutation.type
        if (t === 'setContext' || t === 'clearContext') {
          setTimeout(() => {
            autosize.update(this.$el)
          }, 10)
        }
      })
    },

    watch: {
      joinedList () {
        setTimeout(() => {
          autosize.update(this.$el)
        }, 10)
      },
      focus (focus) {
        if (focus) {
          this.focusedOnce = false
        }
      }
    },

    computed: {
      joinedList () {
        let jl = ''
        if (Array.isArray(this.value)) {
          jl = this.value
            .join(taskDelimiter)
        } else if (this.value) {
          jl = String(this.value)
        }
        return jl
      },
      delay () {
        return this.debounce ? parseInt(this.debounce, 10) : 0
      },
      focusSelectionRangeOptions () {
        if (!this.focusedOnce) {
          this.focusedOnce = true
          let start = 0
          if (this.joinedList.match(taskDelimiter)) {
            start = this.joinedList.lastIndexOf(taskDelimiter) + 3
          }
          return {
            focus: this.focus,
            start,
            end: this.joinedList.length
          }
        } else {
          return {
            focus: false,
            start: this.joinedList.length,
            end: this.joinedList.length
          }
        }
      }
    },

    methods: {
      updateValue ($event) {
        // Clear from linebreaks
        this.$el.value = this.$el.value.replace(/\n/g, '')
        // Do not update if was selected
        if (this.doNotUpdate) {
          this.doNotUpdate = false
          return
        }
        // Return list if changed
        const list = parseList($event.target.value)
        const prev = parseList(this.value)
        if (list.join(taskDelimiter) !== prev.join(taskDelimiter)) {
          // Use delayed update..
          if (this.delay) {
            this.debounceUpdate(() => {
              this.$emit('input', list)
              this.$emit('input-original-event', $event)
            }, this.delay)
          } else {
            // ...or not
            this.$emit('input', list)
            this.$emit('input-original-event', $event)
          }
        }
      },

      keepValue (event) {
        this.doNotUpdate = true
        if (event.target.value) {
          this.cachedEnter = event.target.value
        } else {
          event.target.value = this.cachedEnter
        }
      }
    },

    directives: {
      focusAndSelectRange
    }
  }
</script>