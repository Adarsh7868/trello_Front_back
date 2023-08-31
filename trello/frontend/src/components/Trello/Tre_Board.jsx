import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TrelloBoard = () => {
  const [boardData, setBoardData] = useState({
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        cards: [
          { id: 'card1', content: 'Write Blog' },
          { id: 'card2', content: 'Pay Rent' },
        ],
      },
      {
        id: 'lane2',
        title: 'Completed',
        cards: [
          {
            id: 'card3',
            content: 'Buy Groceries',
          }
        ],
      },
    ],
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return


    const sourceLane = boardData.lanes.find(lane => lane.id === result.source.droppableId);
    const destLane = boardData.lanes.find(lane => lane.id === result.destination.droppableId);
    const [draggedCard] = sourceLane.cards.splice(result.source.index, 1);
    destLane.cards.splice(result.destination.index, 0, draggedCard);

    setBoardData({
      lanes: [...boardData.lanes],
    });
  };

  return (
    <div>
      <h2>Trello Board</h2>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        {boardData.lanes.map((lane) => (

          <div key={lane.id}>

               <h3>{lane.title}</h3>

            <Droppable droppableId={lane.id}>
              {(provided) => (

                <div ref={provided.innerRef} {...provided.droppableProps}>

                  {lane.cards.map((card, index) => (

                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div ref={ provided.innerRef} {...provided.draggableProps}
                          {...provided.dragHandleProps}  
                           className="card"  
                          >{card.content}
                    </div>
                  )}

                </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

        ))}
      </DragDropContext>
    </div>
  );
};

export default TrelloBoard;
