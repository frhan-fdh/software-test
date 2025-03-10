// Class Task merepresentasikan sebuah tugas
class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.completed = false;
        console.log(`Task created: ID=${this.id}, Description='${this.description}'`); // Debugging
    }
}

// Class TodoList untuk mengelola daftar tugas
class TodoList {
    constructor() {
        this.tasks = [];
    }

    // Menambahkan tugas baru
    addTask(description) {
        const id = this.tasks.length + 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        console.log(`Task added: ID=${id}, Total tasks=${this.tasks.length}`); // Debugging
    }

    // Menghapus tugas berdasarkan ID
    removeTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            console.log(`Task removed: ID=${id}, Remaining tasks=${this.tasks.length}`); // Debugging
        } else {
            console.log(`Task ID=${id} not found!`); // Debugging
        }
    }

    // Menandai tugas sebagai selesai
    completeTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            console.log(`Task completed: ID=${id}`); // Debugging
        } else {
            console.log(`Task ID=${id} not found!`); // Debugging
        }
    }

    // Mengedit tugas berdasarkan ID
    editTask(id, newDescription) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            console.log(`Task before edit: ID=${id}, Description='${task.description}'`); // Debugging
            task.description = newDescription;
            console.log(`Task edited: ID=${id}, New Description='${task.description}'`); // Debugging
        } else {
            console.log(`Task ID=${id} not found!`); // Debugging
        }
    }

    // Menghapus semua tugas
    clearTasks() {
        this.tasks = [];
        console.log("All tasks cleared!"); // Debugging
    }

    // Menampilkan semua tugas
    showTasks() {
        console.log("Current Tasks:");
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
        } else {
            this.tasks.forEach(task => {
                console.log(`ID: ${task.id}, Description: '${task.description}', Completed: ${task.completed}`);
            });
        }
    }

    // Mencari tugas berdasarkan kata kunci
    searchTask(keyword) {
        const results = this.tasks.filter(task => task.description.includes(keyword));
        console.log(`Search results for '${keyword}':`);
        results.forEach(task => console.log(`ID: ${task.id}, Description: '${task.description}', Completed: ${task.completed}`));
    }
}

// Contoh penggunaan
const myTodoList = new TodoList();
myTodoList.addTask("Belajar JavaScript");
myTodoList.addTask("Mengerjakan tugas Software Testing");
myTodoList.addTask("Membaca buku pemrograman");
myTodoList.addTask("Menulis dokumentasi kode");
myTodoList.showTasks();
myTodoList.completeTask(1);
myTodoList.editTask(2, "Menyelesaikan proyek Software Testing");
myTodoList.showTasks();
myTodoList.removeTask(3);
myTodoList.showTasks();
myTodoList.searchTask("Belajar");
myTodoList.clearTasks();
myTodoList.showTasks();