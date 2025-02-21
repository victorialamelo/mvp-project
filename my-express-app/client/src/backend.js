// SHOULD I ADD ERROR MESSAGES ON THE FUNCTIONS BELOW?

export async function AddNewSchedule(scheduleData) {
    const response = await fetch(`/api/schedule`, {
        method: "POST",
        body: JSON.stringify(scheduleData),
        headers: {
            "content-type": "application/json",
        },
    });
    return await response.json();
}


export async function GetSchedulesList() {
    const response = await fetch(`/api/schedule/`, {
        method: "GET",
    });
    return await response.json();
}

export async function GetSchedule(scheduleId) {
    const response = await fetch(`/api/schedule/${scheduleId}`, {
        method: "GET",
    });
    return await response.json();
}


export async function GetItemsList(scheduleId) {
    const response = await fetch(`/api/schedule/${scheduleId}/items`, {
        method: "GET",
    });
    return await response.json();
}


// export async function GetItems(scheduleId, itemId) {
//     const response = await fetch(`/api/schedule/${scheduleId}/items/${itemId}`, {
//         method: "GET",
//     });
//     return await response.json();
// }

export async function AddNewItemToSchedule(scheduleId, item) {
    const response = await fetch(`/api/schedule/${scheduleId}/items`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "content-type": "application/json",
        },
    });
    return await response.json();
}

export async function DeleteSchedule(scheduleId) {
    try {
        const response = await fetch(`/api/schedule/${scheduleId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            const schedule = await response.json();
            return schedule; // return the updated schedule list
        } else {
            console.log(`Server Error ${response.status} ${response.statusText}`);
        }
    } catch (e) {
        console.log(`Network error: ${e.message}`);
    }
}

export async function DeleteItem(scheduleId, itemId) {
    try {
        const response = await fetch(`/api/schedule/${scheduleId}/items/${itemId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            const items = await response.json();
            return items; // return the updated items list
        } else {
            console.log(`Server Error ${response.status} ${response.statusText}`);
        }
    } catch (e) {
        console.log(`Network error: ${e.message}`);
    }
}
