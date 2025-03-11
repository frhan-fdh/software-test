const express = require("express");
const app = express();
app.use(express.json()); // Untuk parsing body request dalam format JSON

class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.completed = false;
    console.log(
      `[DEBUG] Task created: ID=${this.id}, Description='${this.description}'`
    ); // Debugging: Menampilkan informasi tugas yang baru dibuat
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
    console.log(
      `[DEBUG] Task added: ID=${id}, Total tasks=${this.tasks.length}`
    ); // Debugging: Menampilkan informasi tugas yang baru ditambahkan
    return task;
  }

  // Menghapus tugas berdasarkan ID
  removeTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log(
        `[DEBUG] Task removed: ID=${id}, Remaining tasks=${this.tasks.length}`
      ); // Debugging: Menampilkan informasi tugas yang dihapus
      return true;
    } else {
      console.log(`[DEBUG] Task ID=${id} not found!`); // Debugging: Menampilkan pesan jika tugas tidak ditemukan
      return false;
    }
  }

  // Menandai tugas sebagai selesai
  completeTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      console.log(`[DEBUG] Task completed: ID=${id}`); // Debugging: Menampilkan informasi tugas yang ditandai selesai
      return task;
    } else {
      console.log(`[DEBUG] Task ID=${id} not found!`); // Debugging: Menampilkan pesan jika tugas tidak ditemukan
      return null;
    }
  }

  // Mengedit tugas berdasarkan ID
  editTask(id, newDescription) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      console.log(
        `[DEBUG] Task before edit: ID=${id}, Description='${task.description}'`
      ); // Debugging: Menampilkan informasi tugas sebelum diubah
      task.description = newDescription;
      console.log(
        `[DEBUG] Task edited: ID=${id}, New Description='${task.description}'`
      ); // Debugging: Menampilkan informasi tugas setelah diubah
      return task;
    } else {
      console.log(`[DEBUG] Task ID=${id} not found!`); // Debugging: Menampilkan pesan jika tugas tidak ditemukan
      return null;
    }
  }

  // Menghapus semua tugas
  clearTasks() {
    this.tasks = [];
    console.log("[DEBUG] All tasks cleared!"); // Debugging: Menampilkan pesan bahwa semua tugas telah dihapus
    return true;
  }

  // Menampilkan semua tugas
  showTasks() {
    console.log("[DEBUG] Displaying all tasks:"); // Debugging: Menampilkan pesan sebelum menampilkan semua tugas
    if (this.tasks.length === 0) {
      console.log("[DEBUG] No tasks available."); // Debugging: Menampilkan pesan jika tidak ada tugas
    } else {
      this.tasks.forEach((task) => {
        console.log(
          `[DEBUG] ID: ${task.id}, Description: '${task.description}', Completed: ${task.completed}`
        ); // Debugging: Menampilkan detail setiap tugas
      });
    }
    return this.tasks;
  }

  // Mencari tugas berdasarkan kata kunci
  searchTask(keyword) {
    console.log(`[DEBUG] Searching for tasks with keyword: '${keyword}'`); // Debugging: Menampilkan pesan sebelum melakukan pencarian
    const results = this.tasks.filter((task) =>
      task.description.includes(keyword)
    );
    if (results.length > 0) {
      results.forEach((task) => {
        console.log(
          `[DEBUG] Found task: ID=${task.id}, Description='${task.description}', Completed=${task.completed}`
        ); // Debugging: Menampilkan hasil pencarian
      });
    } else {
      console.log("[DEBUG] No tasks found with the given keyword."); // Debugging: Menampilkan pesan jika tidak ada tugas yang ditemukan
    }
    return results;
  }
}

// Inisialisasi TodoList
const todoList = new TodoList();

// Endpoint untuk menambahkan tugas
app.post("/tasks", (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }
  const task = todoList.addTask(description);
  res.status(201).json(task);
});

// Endpoint untuk menghapus tugas
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const isRemoved = todoList.removeTask(id);
  if (isRemoved) {
    res.status(204).json({ message: "Task removed" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Endpoint untuk menandai tugas sebagai selesai
app.put("/tasks/:id/complete", (req, res) => {
  const id = parseInt(req.params.id);
  const task = todoList.completeTask(id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Endpoint untuk mengedit tugas
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }
  const task = todoList.editTask(id, description);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Endpoint untuk menghapus semua tugas
app.delete("/tasks", (req, res) => {
  todoList.clearTasks();
  res.status(204).send();
});

// Endpoint untuk menampilkan semua tugas
app.get("/tasks", (req, res) => {
  const tasks = todoList.showTasks();
  res.json(tasks);
});

// Endpoint untuk mencari tugas berdasarkan kata kunci
app.get("/tasks/search", (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }
  const results = todoList.searchTask(keyword);
  res.json(results);
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
