import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Message.css"; // Import the CSS file
import Title from "../components/Title";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filterType, setFilterType] = useState("all");
  const [filterRegistered, setFilterRegistered] = useState("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  // Fetch all messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/message/all");
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to load messages.");
    }
  };

  // Select a message to view details
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Handle reply submission (only if userId exists)
  const handleReplySubmit = async () => {
    if (!selectedMessage?.userId) {
      toast.error("Cannot reply to unregistered users.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/message/reply", {
        messageId: selectedMessage._id,
        adminReply: reply,
      });

      toast.success("Reply sent successfully!");
      setReply("");
      fetchMessages(); // Refresh messages
    } catch (error) {
      toast.error("Failed to send reply.");
    }
  };

  // Sort messages
  const sortedMessages = [...messages].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.sendDate) - new Date(a.sendDate);
    } else {
      return new Date(a.sendDate) - new Date(b.sendDate);
    }
  });

  // Filter messages by type and registration status
  const filteredMessages = sortedMessages.filter((msg) => {
    return (
      (filterType === "all" || msg.messageType === filterType) &&
      (filterRegistered === "all" ||
        (filterRegistered === "registered" && msg.userId) ||
        (filterRegistered === "unregistered" && !msg.userId))
    );
  });

  return (
    <div className="message-container">
      <Title text1={"USER"} text2={"MESSAGE"} ></Title>

      <div className="filter-container">
        <label>Sort By:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>

        <label>Filter by Message Type:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="general">General Inquiry</option>
          <option value="complaint">Complaint</option>
          <option value="inquiry">Inquiry</option>
          <option value="feedback">Feedback</option>
        </select>

        <label>Filter by User Type:</label>
        <select value={filterRegistered} onChange={(e) => setFilterRegistered(e.target.value)}>
          <option value="all">All</option>
          <option value="registered">Registered Users</option>
          <option value="unregistered">Unregistered Users</option>
        </select>
      </div>

      <table className="message-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredMessages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.subject}</td>
              <td>{msg.messageType}</td>
              <td>{msg.status}</td>
              <td>
                <button className="view-btn" onClick={() => handleViewMessage(msg)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMessage && (
        <div className="message-details">
          <h3>Message Details</h3>
          <p><strong>Name:</strong> {selectedMessage.name}</p>
          <p><strong>Email:</strong> {selectedMessage.email}</p>
          <p><strong>Subject:</strong> {selectedMessage.subject}</p>
          <p><strong>Message:</strong> {selectedMessage.message}</p>
          <p><strong>Status:</strong> {selectedMessage.status}</p>

          {selectedMessage.userId ? (
            <div className="reply-section">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply..."
              />
              <button className="reply-btn" onClick={handleReplySubmit}>
                Send Reply
              </button>
            </div>
          ) : (
            <p className="unregistered-warning">Cannot reply to unregistered users.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
