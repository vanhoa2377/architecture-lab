const { createTaskService } = require("./services/task.service.cjs");

let saveCalls = 0;

const fakeRepository = {
    create(title) {
        saveCalls += 1;
        return { id: 99, title };
    },
};

const service = createTaskService(fakeRepository);

console.log(service.createTask("  Học DI  "));

try {
    service.createTask("a".repeat(101));
} catch (error) {
    console.log(error.code, error.message);
}

console.log("Số lần gọi lưu:", saveCalls);