import { useContext } from "react";
import { SettingsContext } from "../context/settings";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { When } from "react-if";
import { AuthContext } from "../context/Auth";

export default function List(prop) {
  const settings = useContext(SettingsContext);
  const auth = useContext(AuthContext);

  if (settings.displaySettings) {
    return (
      <Card elevation={Elevation.TWO} key={prop.item.id} className="list-card">
        <p>{prop.item.text}</p>
        <p>
          <small>Assigned to: {prop.item.assignee}</small>
        </p>
        <p>
          <small>Difficulty: {prop.item.difficulty}</small>
        </p>
        {/* <p data-testid="todo-completed">
          <small>Complete: {prop.item.complete.toString()}</small>
        </p> */}
        {/* {!prop.item.complete && (
          <Button
            onClick={() => prop.toggleComplete(prop.item.id)}
            icon="tick"
            intent="success"
          >
            Mark Complete
          </Button>
        )}{" "} */}
        <Button onClick={() => prop.deleteItem(prop.item.id)}>Delete</Button>
        <Button onClick={() => prop.toggleComplete(prop.item.id)}>
          Complete {prop.item.complete.toString()}
        </Button>
        <When condition={auth.authurized("")}>
          <Button onClick={() => prop.deleteItem(prop.item.id)}>
            Delete Item
          </Button>
        </When>
      </Card>
    );
  } else {
    if (!prop.item.complete) {
      return (
        <Card key={prop.item.id} className="list-card">
          <p>{prop.item.text}</p>
          <p>
            <small>Assigned to: {prop.item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {prop.item.difficulty}</small>
          </p>
          {/* <p data-testid="todo-completed">
            <small>Complete: {prop.item.complete.toString()}</small>
          </p> */}
          {/* {!prop.item.complete && (
            <Button
              onClick={() => prop.toggleComplete(prop.item.id)}
              icon="tick"
              intent="success"
            >
              Mark Complete
            </Button>
          )}{" "} */}
          <Button onClick={() => prop.deleteItem(prop.item.id)}>Delete</Button>
          <Button onClick={() => prop.toggleComplete(prop.item.id)}>
            Complete {prop.item.complete.toString()}
          </Button>
          <When condition={auth.authurized("")}>
            <Button onClick={() => prop.deleteItem(prop.item.id)}>
              Delete Item
            </Button>
          </When>
        </Card>
      );
    }
  }
}
