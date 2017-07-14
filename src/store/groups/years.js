import Group from '@/models/group'
import Task from '@/models/task'
import Year from '@/models/year'
import { Storage } from '@/store/storage'
import { rootDetails } from '@/utils/group'

// Format to YYYY
function format (ms) {
  const d = new Date(ms)
  return d.getFullYear() + ''
}

// Singleton to keep months tree
export const Years = (new Group({
  resolvePath: entry => {
    return [format(entry.start)]
      .concat(entry.details)
  },
  constructors: [Year, Task],
  name: 'years'
}))

export function YearsPlugin (store) {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'addEntry') {
      let resolvePath
      if (Storage.context) {
        let contextRootPath = rootDetails(Storage.context)
        resolvePath = function (entry) {
          return [format(entry.start)]
            .concat(entry.details.slice(contextRootPath.length))
        }
      }
      Years.addEntry(mutation.payload.entry, 0, resolvePath)
    }
    if (mutation.type === 'removeEntry') {
      Years.removeEntry(mutation.payload.entry)
    }
    if (mutation.type === 'clearEntries') {
      Years.children = []
    }
  })
}
