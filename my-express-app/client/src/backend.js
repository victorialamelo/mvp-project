export async function backendScheduleItemCreate(scheduleId, item) {
    const response = await fetch(`/api/schedule/${scheduleId}/items`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "content-type": "application/json",
        },
    });

    return await response.json();
}

export async function backendScheduleItemsList(scheduleId) {
    const response = await fetch(`/api/schedule/${scheduleId}/items`, {
        method: "GET",
    });

    return await response.json();
}
