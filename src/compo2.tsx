import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './taskdesign.css';

// Define the structure of a Task using an interface
interface Task {
    taskid: number;
    taskimage: string;
    tasktitle: string;
    tasklink: string;
    taskreward: number | string;
}

const taskcompo = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Use Task[] for the tasks array
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [taskLink, setTaskLink] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskReward, setTaskReward] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    // Fetch tasks from API when component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://api-dapp.gotem.io/get_user_tasks?userid=1989734047');
                const data = await response.json();
                setTasks(data.task_details); // Set the task details array
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Handle image selection for adding tasks
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    // Handle form submission for adding a new task
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!taskTitle || !taskReward || !taskLink || !selectedImage) {
            setMessage("All fields are required, including an image!");
            return;
        }

        const formData = new FormData();
        formData.append("tasktitle", taskTitle);
        formData.append("taskreward", taskReward);
        formData.append("tasklink", taskLink);
        formData.append("taskimage", selectedImage);

        try {
            const response = await fetch('https://api-dapp.gotem.io/add_task', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage("Task has been successfully added!");
                // Clear all form fields
                setSelectedImage(null);
                setTaskLink("");
                setTaskTitle("");
                setTaskReward("");
            } else {
                setMessage("Failed to add the task. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred while adding the task.");
            console.error("Error adding task:", error);
        }
    };

    // Handle task removal when clicking on a task
    const handleRemoveTask = async (taskid: number) => { // Explicitly define taskid as number
        if (window.confirm('Are you sure you want to remove this task?')) {
            try {
                const response = await fetch(`https://api-dapp.gotem.io/remove_task?taskid=${taskid}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (response.ok) {
                    setTasks(tasks.filter(task => task.taskid !== taskid));
                    alert('Task removed successfully!');
                } else {
                    alert(result.error || 'Failed to remove the task.');
                }
            } catch (error) {
                alert('Error removing task: ' + error);
                console.error('Error removing task:', error);
            }
        }
    };

    return (
        <div className="add-tasks-container">
            <h1 className="add-tasks-header">Add / Remove Tasks</h1>

            {/* Task removal section */}
            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.taskid} className="task-card" onClick={() => handleRemoveTask(task.taskid)}>
                        <img src={task.taskimage} alt={task.tasktitle} className="task-image"/>
                        <div className="task-info">
                            <h4>{task.tasktitle}</h4>
                            <p>{task.tasklink}</p>
                            <p>Reward: {task.taskreward}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Task addition form */}
            <div className="glass-box">
                <div className="image-upload">
                    <label htmlFor="file-upload" className="upload-label">
                        Upload Image
                    </label>
                    <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} />
                    {selectedImage && (
                        <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="image-preview" />
                    )}
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        required
                        value={taskLink}
                        onChange={(e) => setTaskLink(e.target.value)}
                    />
                    <label>
                        {Array.from("Task Link").map((char, index) => (
                            <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>{char}</span>
                        ))}
                    </label>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        required
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <label>
                        {Array.from("Task Title").map((char, index) => (
                            <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>{char}</span>
                        ))}
                    </label>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        required
                        value={taskReward}
                        onChange={(e) => setTaskReward(e.target.value)}
                    />
                    <label>
                        {Array.from("Task Reward").map((char, index) => (
                            <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>{char}</span>
                        ))}
                    </label>
                </div>
            </div>
            <button className="add-button" onClick={handleSubmit}>Add</button>
            {message && <div className="feedback-message">{message}</div>}
        </div>
    );
};

export default taskcompo;
