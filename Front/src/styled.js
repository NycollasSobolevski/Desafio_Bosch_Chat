import styled from 'styled-components';

const ToDoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`
const ToDoItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
    top: 0;
    height: 50px;
    width: 100vw;
    position: absolute;
`

export { ToDoDiv, ToDoItem,Header }