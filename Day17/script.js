const projects = [
    { id: 1, student: "Rahul", title: "E-Commerce App", status: "Completed", revenue: 45000, expense: 20000 },
    { id: 2, student: "Priya", title: "Weather App", status: "Pending", revenue: 0, expense: 8000 },
    { id: 3, student: "Amit", title: "Task Manager", status: "Completed", revenue: 55000, expense: 25000 },
    { id: 4, student: "Sneha", title: "Portfolio Site", status: "Completed", revenue: 30000, expense: 10000 },
    { id: 5, student: "Vikram", title: "Chat App", status: "Pending", revenue: 0, expense: 7000 }
];

// FILTER
const completed = projects.filter(p => p.status === "Completed");
const pending = projects.filter(p => p.status === "Pending");

// REDUCE
const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0);
const totalExpenses = projects.reduce((sum, p) => sum + p.expense, 0);

// UPDATE UI
document.getElementById("completedCount").textContent = completed.length;
document.getElementById("pendingCount").textContent = pending.length;
document.getElementById("totalRevenue").textContent = "₹" + totalRevenue.toLocaleString();
document.getElementById("totalExpenses").textContent = "₹" + totalExpenses.toLocaleString();

// TABLE RENDER
const table = document.getElementById("projectTable");

projects.forEach(project => {
    const row = `
        <tr>
            <td>${project.id}</td>
            <td>${project.student}</td>
            <td>${project.title}</td>
            <td class="status-${project.status.toLowerCase()}">${project.status}</td>
            <td>₹${project.revenue.toLocaleString()}</td>
        </tr>
    `;
    table.innerHTML += row;
});