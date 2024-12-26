import Konva from "konva"
import { Circle as KonvaCircle, Text } from "react-konva"

import { ICircle } from "../../../interfaces/ITree"

function Commit({ circle }: { circle: ICircle }) {
  const setCursorPointer = (
    e: Konva.KonvaEventObject<MouseEvent>,
    cursorType: string
  ) => {
    const container = e.target.getStage()?.container()
    if (container) {
      container.style.cursor = cursorType
    }
  }
  return (
    <>
      <KonvaCircle
        id={`circle-${circle.commit.hash}`}
        x={circle.x}
        y={circle.y}
        radius={20}
        fill={circle.commit.isDetached ? "" : circle.color}
        stroke="#FFFFFF"
        strokeWidth={2}
        dash={circle.commit.isDetached ? [10, 5] : []}
        onMouseEnter={(e) => {
          setCursorPointer(e, "pointer")
        }}
        onMouseLeave={(e) => {
          setCursorPointer(e, "default")
        }}
      />
      <Text
        id={`text-${circle.commit.hash}`}
        x={circle.x}
        y={circle.y}
        text={circle.commit.label}
        align="center"
        verticalAlign="middle"
        fill="black"
        offsetX={6}
        offsetY={5}
        fontStyle="bold"
        onMouseEnter={(e) => {
          setCursorPointer(e, "pointer")
        }}
        onMouseLeave={(e) => {
          setCursorPointer(e, "default")
        }}
      />
    </>
  )
}

export default Commit
