// ToDoList.jsx

import React, { useState } from "react";
import "./ToDoList.css";
import NavBar from "../../components/NavBar";

function ToDoList() {
    // ...State und Logik wie gehabt...
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortBy, setSortBy] = useState("dueDate");

    function resetForm() {
        setTitle("");
        setDescription("");
        setPriority("medium");
        setCategory("");
        setDueDate("");
        setEditingId(null);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        if (editingId) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingId
                        ? { ...task, title, description, priority, category, dueDate: dueDate || null }
                        : task
                )
            );
        } else {
            const newTask = {
                id: crypto.randomUUID(),
                title: title.trim(),
                description: description.trim(),
                priority,
                category: category.trim(),
                dueDate: dueDate || null,
                isCompleted: false,
                createdAt: new Date().toISOString(),
                completedAt: null,
            };
            setTasks((prev) => [...prev, newTask]);
        }
        resetForm();
    }
    function handleEdit(task) {
        setEditingId(task.id);
        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(task.priority || "medium");
        setCategory(task.category || "");
        setDueDate(task.dueDate || "");
    }
    function handleDelete(id) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        if (editingId === id) resetForm();
    }
    function handleToggleComplete(id) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        isCompleted: !task.isCompleted,
                        completedAt: !task.isCompleted ? new Date().toISOString() : null,
                    }
                    : task
            )
        );
    }
    const allCategories = [
        "all",
        ...Array.from(new Set(tasks.map((t) => t.category).filter(Boolean))),
    ];
    const visibleTasks = tasks
        .filter((task) => {
            if (filterStatus === "open" && task.isCompleted) return false;
            if (filterStatus === "done" && !task.isCompleted) return false;
            if (filterCategory !== "all" && task.category !== filterCategory) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "dueDate") {
                const da = a.dueDate ? new Date(a.dueDate) : null;
                const db = b.dueDate ? new Date(b.dueDate) : null;
                if (!da && !db) return 0;
                if (!da) return 1;
                if (!db) return -1;
                return da - db;
            }
            if (sortBy === "priority") {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.priority] - order[b.priority];
            }
            return 0;
        });

    return (
        <div className="todo-terminal-bg" style={{ paddingTop: '70px' }}>
            <div className="scanline"></div>
            <NavBar />
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <span className="terminal-title">todo.sh — 80x24</span>
                </div>
                <div className="terminal-body">
                    <h2>To-Do Liste</h2>
                    {/* Formular */}
                    <form className="todo-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label>
                                Titel*
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Aufgabe eingeben" />
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Beschreibung
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional: Details zur Aufgabe" />
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Priorität
                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="low">Niedrig</option>
                                    <option value="medium">Mittel</option>
                                    <option value="high">Hoch</option>
                                </select>
                            </label>
                            <label>
                                Kategorie
                                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="z.B. Arbeit, Privat, Lernen" />
                            </label>
                            <label>
                                Fällig bis
                                <input type="date" value={dueDate || ""} onChange={(e) => setDueDate(e.target.value)} />
                            </label>
                        </div>
                        <div className="form-actions">
                            <button type="submit">{editingId ? "Aufgabe aktualisieren" : "Aufgabe hinzufügen"}</button>
                            {editingId && (
                                <button type="button" onClick={resetForm}>Abbrechen</button>
                            )}
                        </div>
                    </form>
                    {/* Filter & Sortierung */}
                    <div className="todo-controls">
                        <div>
                            <span>Status: </span>
                            <button type="button" className={filterStatus === "all" ? "active" : ""} onClick={() => setFilterStatus("all")}>Alle</button>
                            <button type="button" className={filterStatus === "open" ? "active" : ""} onClick={() => setFilterStatus("open")}>Offen</button>
                            <button type="button" className={filterStatus === "done" ? "active" : ""} onClick={() => setFilterStatus("done")}>Erledigt</button>
                        </div>
                        <div>
                            <span>Kategorie: </span>
                            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                {allCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat === "all" ? "Alle" : cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <span>Sortieren nach: </span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="dueDate">Fälligkeitsdatum</option>
                                <option value="priority">Priorität</option>
                            </select>
                        </div>
                    </div>
                    {/* Liste */}
                    <ul className="todo-list">
                        {visibleTasks.length === 0 && (
                            <li className="todo-empty">Keine Aufgaben vorhanden.</li>
                        )}
                        {visibleTasks.map((task) => (
                            <li key={task.id} className={`todo-item ${task.isCompleted ? "todo-item--done" : ""}`}>
                                <div className="todo-main">
                                    <div className="todo-title-row">
                                        <input type="checkbox" checked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} />
                                        <span className="todo-title">{task.title}</span>
                                        <span className={`todo-badge priority-${task.priority}`}>{task.priority}</span>
                                    </div>
                                    {task.description && <p className="todo-description">{task.description}</p>}
                                    <div className="todo-meta">
                                        {task.category && <span className="todo-chip">#{task.category}</span>}
                                        {task.dueDate && <span className="todo-chip">Fällig: {task.dueDate}</span>}
                                        {task.isCompleted && task.completedAt && <span className="todo-chip">Erledigt am: {new Date(task.completedAt).toLocaleDateString()}</span>}
                                    </div>
                                </div>
                                <div className="todo-actions">
                                    <button type="button" onClick={() => handleEdit(task)}>Bearbeiten</button>
                                    <button type="button" onClick={() => handleDelete(task.id)}>Löschen</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
