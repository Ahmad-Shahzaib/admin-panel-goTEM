import { useState, ChangeEvent, FormEvent } from 'react';
import './taskdesign.css';

const taskcompo = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [taskLink, setTaskLink] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskReward, setTaskReward] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!taskTitle || !taskReward || !taskLink || !selectedImage) {
            setMessage("All fields are required, including an image!");
            return;
        }

        // Create a forsm data objsect to be sent via the POST request
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

    return (
        <div className="add-tasks-container">
            <h1 className="add-tasks-header">Add Tasks</h1>
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
