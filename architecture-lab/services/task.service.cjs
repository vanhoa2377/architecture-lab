function createError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
}

function createTaskService(taskRepository) {
    const MAX_TASK_TITLE_LENGTH = 100;

    function listTasks() {
        return taskRepository.findAll();
    }

    function getTaskById(id) {
        if (!Number.isSafeInteger(id) || id < 1) {
            throw createError(
                "INVALID_TASK_ID",
                "ID phải là số nguyên dương",
            );
        }

        const task = taskRepository.findById(id);

        if (!task) {
            throw createError(
                "TASK_NOT_FOUND",
                "Không tìm thấy công việc",
            );
        }

        return task;
    }

    function createTask(title) {
        if (typeof title !== "string" || title.trim() === "") {
            throw createError(
                "INVALID_TASK_TITLE",
                "Tên công việc phải là chuỗi không rỗng",
            );
        }

        const cleanTitle = title.trim();

        if (cleanTitle.length > MAX_TASK_TITLE_LENGTH) {
            throw createError(
                "INVALID_TASK_TITLE",
                `Tên công việc tối đa ${MAX_TASK_TITLE_LENGTH} ký tự`,
            );
        }

        return taskRepository.create(cleanTitle);
    }

    return {
        listTasks,
        getTaskById,
        createTask,
    };
}

module.exports = { createTaskService };