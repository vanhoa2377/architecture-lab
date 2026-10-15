// const express = require("express");
// const path = require("node:path");
// const config = require("./config.cjs");

// const taskRepository = require("./repositories/task.repository.cjs");
// const { createTaskService } = require("./services/task.service.cjs");
// const { createTaskController } = require("./controllers/task.controller.cjs");

// // Lắp ghép các thành phần.
// const taskService = createTaskService(taskRepository);
// const taskController = createTaskController(taskService);

// const app = express();

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// app.use(express.json());

// app.get("/api/tasks", taskController.listTasks);
// app.get("/api/tasks/:id", taskController.getTaskById);
// app.post("/api/tasks", taskController.createTask);

// app.use(express.static(path.join(__dirname, "public")));

// // app.listen(3000, () => {
// //     console.log("Server đang chạy tại http://localhost:3000");
// // });

// // app.listen(config.port, () => {
// //     console.log(
// //         `Server đang chạy tại http://localhost:${config.port}`,
// //     );
// // });

// app.listen(config.port, () => {
//     console.log(
//         `[${config.appEnv}] Server đang chạy tại http://localhost:${config.port}`,
//     );

//     console.log(`NODE_ENV=${config.nodeEnv}`);
// });


const express = require("express");
const path = require("node:path");
const config = require("./config.cjs");

const { createSqliteTaskRepository } =
    require("./repositories/task.sqlite.repository.cjs");

const { createTaskService } =
    require("./services/task.service.cjs");

const { createTaskController } =
    require("./controllers/task.controller.cjs");

const taskRepository = createSqliteTaskRepository(config.dbFile);
const taskService = createTaskService(taskRepository);
const taskController = createTaskController(taskService);

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.get("/api/tasks", taskController.listTasks);
app.get("/api/tasks/:id", taskController.getTaskById);
app.post("/api/tasks", taskController.createTask);

app.use(express.static(path.join(__dirname, "public")));

app.listen(config.port, () => {
    console.log(
        `[${config.appEnv}] Server đang chạy tại http://localhost:${config.port}`,
    );

    console.log(`NODE_ENV=${config.nodeEnv}`);
    console.log(`Database: ${config.dbFile}`);
});