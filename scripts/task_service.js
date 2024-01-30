import { db, STORE_NAME, TASK_SCHEMA } from "./db"

export function getTasksByDueDate(dueDate) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const index = store.index(TASK_SCHEMA.dueDate)
        const query = index.getAll(dueDate)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

export function addTask(data) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const query = store.add(data)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}
