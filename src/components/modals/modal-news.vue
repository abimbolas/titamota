<template lang="pug">
  .modal.news
    h2 {{ label('modal.news.title') }}

    //- Show modal next time
    p
      custom-checkbox(
        class="show-news-modal"
        v-model="hideUntilNextUpdate")
      label(v-custom-for="'.show-news-modal'")
        span {{ label('settings.doNotShowUntilNextUpdate') }}

    template(v-if="locale === 'ru'")
      h3 {{ displayLastUpdate }}
      p
        | Создана Телеграм-группа&ensp;
        a(href="https://t.me/usersoftitamota" target="_blank") t.me/usersoftitamota
        | &ensp;для вопросов, идей, объявлений и прочего трёпа с разработчиком, присоединяйтесь!
      p
        | Также, есть возможность подписаться на новости Titamota по e-mail
        | (можно будет отписаться по ссылке в письме):

      mailchimp-subscribe(
        url="https://mr-woodman.us6.list-manage.com/subscribe/post-json"
        user-id="189fe8c3a292bc7c65d0c9efa"
        list-id="45be753287"
        @error="onError"
        @success="onSuccess"
      )
        template(v-slot="{ subscribe, setEmail, error, success, loading }")
          div
            form.subscribe-form(@submit.prevent="subscribe")
              input.subscribe-input(
                type="email"
                placeholder="mail@example.com"
                @input="setEmail($event.target.value)")
              button.subscribe-submit(type="submit") Подписаться
            p.subscribe-hint
              small.text-danger(v-if="error") {{ error }}
              small.text-success(v-if="success")
                strong Вам выслано письмо с подтверждением (проверьте папку спама)
              small.text-muted(v-if="loading") Подписываемся...

      p(class="text-right")
        a(class="toggle-previous" @click="showPrevious = !showPrevious")
          span(v-if="!showPrevious") Показать предыдущие новости
          span(v-else) Скрыть предыдущие новости

      div(v-if="showPrevious")
        h3 {{ getDate('2020-12-25') }}
        p Добавлен хелп по таймеру. Проверь, может еще не все возможности знаешь?
        p
          img.modal-news-illustration(src="static/img/show-help-ru-02.png")
        p Или
        p
          img.modal-news-illustration(src="static/img/show-help-ru-01.png")
        p
          button.block(@click="openHelp()") Открыть помощь сейчас

    template(v-else)
      h3 {{ displayLastUpdate }}
      p
        | Создана Телеграм-группа&ensp;
        a(href="https://t.me/usersoftitamota" target="_blank") t.me/usersoftitamota
        | &ensp;для вопросов, идей, объявлений и прочего трёпа с разработчиком, присоединяйтесь!
      p
        | Также, есть возможность подписаться на новости Titamota по e-mail
        | (можно будет отписаться по ссылке в письме):

      mailchimp-subscribe(
        url="https://mr-woodman.us6.list-manage.com/subscribe/post-json"
        user-id="189fe8c3a292bc7c65d0c9efa"
        list-id="45be753287"
        @error="onError"
        @success="onSuccess"
      )
        template(v-slot="{ subscribe, setEmail, error, success, loading }")
          div
            form.subscribe-form(@submit.prevent="subscribe")
              input.subscribe-input(
                type="email"
                placeholder="mail@example.com"
                @input="setEmail($event.target.value)")
              button.subscribe-submit(type="submit") Subscribe
            p.subscribe-hint
              small.text-danger(v-if="error") {{ error }}
              small.text-success(v-if="success")
                strong Confirmation email was sent to you (check your spam folder if not found)
              small.text-muted(v-if="loading") Subscribing...

      p(class="text-right")
        a(class="toggle-previous" @click="showPrevious = !showPrevious")
          span(v-if="!showPrevious") Show previous news
          span(v-else) Hide previous news

      div(v-if="showPrevious")
        h3 {{ getDate('2020-12-25') }}
        p Help added. Check it, chances are you'll find out something new.
        p
          img.modal-news-illustration(src="static/img/show-help-02.png")
        p Or
        p
          img.modal-news-illustration(src="static/img/show-help-01.png")
        p
          button.block(@click="openHelp()") Open help now

    //- Close
    .close-modal(@click="closeModal")
      i.material-icons close
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import mailchimpSubscribe from 'vue-mailchimp-subscribe'
  import i18nLabel from '@/mixins/i18n-label'
  import customCheckbox from '@/components/other/custom-checkbox'
  import customFor from '@/directives/custom-for'
  import { time } from '@/utils/time'

  export default {
    data () {
      return {
        showPrevious: false
      }
    },
    computed: {
      hideUntilNextUpdate: {
        get () {
          return this.lastUpdate <= this.lastReadUpdate
        },
        set (value) {
          this.setLastReadUpdate({ lastReadUpdate: new Date() })
        }
      },
      displayLastUpdate () {
        return time(this.lastUpdate.getTime()).format('D MMM YYYY', this.locale)
      },
      ...mapGetters([
        'locale',
        'lastUpdate',
        'lastReadUpdate'
      ])
    },
    methods: {
      openHelp () {
        this.toggleSidebar()
        this.openModal({ modal: 'help' })
      },
      getDate (str) {
        return time(new Date(str).getTime()).format('D MMM YYYY', this.locale)
      },
      onError (error) {
        console.log('onError', error)
      },
      onSuccess (success) {
        console.log('onSuccess', success)
      },
      ...mapMutations([
        'toggleSidebar',
        'setLastReadUpdate'
      ]),
      ...mapActions([
        'openModal',
        'closeModal'
      ])
    },
    mixins: [
      i18nLabel
    ],
    directives: {
      customFor
    },
    components: {
      customCheckbox,
      mailchimpSubscribe
    }
  }
</script>
<style lang="stylus">
  @import '~@/assets/stylesheets/variables'
  @import '~@/assets/stylesheets/modal'
  @import '~@/assets/stylesheets/core'

  .modal.news
    max-width 640px
    box-shadow 1px 3px 10px 0px alpha(titamota-color-text, 10%)
    text-align left
    h3
      margin-top 40px

    .modal-news-illustration
      width 100%
      border-radius 5px

    .toggle-previous
      text-decoration underline

    .subscribe-form
      display flex
      justify-content space-between
      align-items flex-start

    .subscribe-input
      flex-grow 1

    .subscribe-submit
      margin-left 0.5rem

    .subscribe-hint
      margin-top 0.5rem;
</style>
