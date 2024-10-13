import React from 'react';
import TaskCard from '../../../components/tasks/taskCard';
import { tasks } from '../../../data/taskData';
import PaginatedList from '../../../components/paginatedList/PaginatedList';
import './task.css';

const Task: React.FC = () => {
  const pageSize = 4; // Keep pagination the same

  return (
    <div className="task-page" style={{ padding: '20px', background: '#f4f6f8', borderRadius: '8px' }}>
      {/* Render paginated task cards */}
      <PaginatedList
        items={tasks}
        pageSize={pageSize}
        renderItem={(task) => (
          <div style={{ marginBottom: '15px' }}>
            <TaskCard key={task.id} task={task} />
          </div>
        )}
      />
    </div>
  );
};

export default Task;
