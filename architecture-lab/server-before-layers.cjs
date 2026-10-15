const express = require("express");
const path = require("node:path");

const app = express();

// Cung cấp Middleware để parse JSON trong request body từ client gửi lên.
app.use(express.json());

const tasks = [
    { id: 1, title: "Học Client–Server" },
    { id: 2, title: "Quan sát HTTP request" },
];

let nextTaskId = 3;

// Ghi lại request để ta quan sát ở terminal.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Trả dữ liệu công việc.
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({
            message: "ID phải là số nguyên dương",
        });
    }

    const task = tasks.find((item) => item.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Không tìm thấy công việc",
        });
    }

    return res.status(200).json(task);
});


// Cung cấp các file frontend trong thư mục public.
app.use(express.static(path.join(__dirname, "public")));

// Nhận dữ liệu công việc mới
app.post("/api/tasks", (req, res) => {
    const title = req.body?.title;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            message: "Tên công việc phải là chuỗi không rỗng",
        });
    }

    const newTask = {
        id: nextTaskId,
        title: title.trim(),
    };

    nextTaskId += 1;
    tasks.push(newTask);

    return res.status(201).json(newTask);
});

app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});