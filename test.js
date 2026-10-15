async function createTask(title) {
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Body:", data);
}




node--env - file=.env server.cjs