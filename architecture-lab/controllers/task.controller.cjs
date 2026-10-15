function sendError(res, error) {
    const statusByCode = {
        INVALID_TASK_ID: 400,
        INVALID_TASK_TITLE: 400,
        TASK_NOT_FOUND: 404,
    };

    const status = statusByCode[error.code] || 500;

    if (status === 500) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi hệ thống",
        });
    }

    return res.status(status).json({
        message: error.message,
    });
}

function createTaskController(taskService) {
    function listTasks(req, res) {
        try {
            return res.status(200).json(taskService.listTasks());
        } catch (error) {
            return sendError(res, error);
        }
    }

    function getTaskById(req, res) {
        try {
            const task = taskService.getTaskById(Number(req.params.id));
            return res.status(200).json(task);
        } catch (error) {
            return sendError(res, error);
        }
    }

    function createTask(req, res) {
        try {
            const task = taskService.createTask(req.body?.title);
            return res.status(201).json(task);
        } catch (error) {
            return sendError(res, error);
        }
    }

    return {
        listTasks,
        getTaskById,
        createTask,
    };
}

module.exports = { createTaskController };