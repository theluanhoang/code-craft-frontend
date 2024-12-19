"use client"

import SHA1 from "crypto-js/sha1";
import gsap from "gsap";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Arrow, Group, Layer, Stage } from "react-konva";
import { ICircle } from "../../interfaces/ITree";
import colors from "../../themes/colors";
import Commit from "../shapes/commit";
import TagComponent from "../shapes/square";
import "./commit.scss";

enum ConnectionType {
  NONE = "NONE",
  BRANCH = "BRANCH",
  MERGE_FAST_FORWARD = "MERGE_FAST_FORWARD",
  MERGE_THREE_WAY_FORWARD = "MERGE_THREE_WAY_FORWARD",
  MERGE_SQUASH = "MERGE_SQUASH",
  MERGE_REBASE = "MERGE_REBASE",
}

interface IConnection {
  from: ICircle;
  to: ICircle;
  connectionType: ConnectionType;
}
type ColorKey = keyof typeof colors;

const CommitGraph: React.FC = () => {
  const stageRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<ICircle[]>([]);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const usedColors = new Set<ColorKey>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dimensionCommits, setDimensionCommits] = useState<{
    x: number,
    y: number
  }[] | []>([]);
  const [isMerge, setIsMerge] = useState<boolean>(false);
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [dynamicWidth, setDynamicWidth] = useState(0);
  const [newCommit, setNewCommit] = useState<ICircle | null>();
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [branch, setBranch] = useState("main");
  const [head, setHead] = useState<ICircle>();
  const [commitPerBranch, setCommitPerBranch] = useState<{
    [key: string]: {
      latestCommit: ICircle;
      originCommit: ICircle;
      color: string;
    };
  }>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomColor = () => {
    if (usedColors.size === Object.keys(colors).length) {
      return colors.vividPink;
    }

    let randomIndex: number;
    let nextColorKey: ColorKey;

    do {
      randomIndex = Math.floor(Math.random() * Object.keys(colors).length);
      nextColorKey = Object.keys(colors)[randomIndex] as ColorKey;
    } while (usedColors.has(nextColorKey));

    usedColors.add(nextColorKey);

    return colors[nextColorKey];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateSize = () => {
        if (parentRef.current) {
          setDimensions({
            width: parentRef.current.offsetWidth,
            height: parentRef.current.offsetHeight,
          });
          setCoordinates({
            x: parentRef.current.offsetWidth / 2 - 10,
            y: 50,
          });
        }
      };
  
      updateSize();
      window.addEventListener("resize", updateSize);
  
      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, []);

  useEffect(() => {
    if (circles.length > 0) {
      const maxX = Math.max(...circles.map((circle) => circle.x));
      const minX = Math.min(...circles.map((circle) => circle.x));

      const extraSpace = 200;
      setDynamicWidth(Math.max(dimensions.width, maxX - minX + extraSpace));

      const maxY = Math.max(...circles.map((circle) => circle.y));
      setDynamicHeight(maxY + 100);
    }
  }, [circles, dimensions.width]);

  const animateNode = (node: Konva.Node | null) => {
    if (node) {
      gsap.fromTo(
        node,
        { y: node.y() - 100 },
        { y: node.y(), duration: 0.5, ease: "bounce.out" }
      );
    }
  };

  useEffect(() => {
    if (isClient && newCommit) {
      const circleNode = stageRef.current.findOne(
        `#circle-${newCommit.commit.hash}`
      ) as Konva.Circle;
      const textNode = stageRef.current.findOne(
        `#text-${newCommit.commit.hash}`
      ) as Konva.Text;
      const tagNode = stageRef.current.findOne(
        `#tag-branch-${newCommit.commit.hash}`
      ) as Konva.Rect;

      animateNode(circleNode);
      animateNode(textNode);
      animateNode(tagNode);
    }
  }, [isClient, newCommit]);

  useEffect(() => {
    if (head) {
      const headNode = stageRef.current.findOne(
        `#head-${head.commit.hash}`
      ) as Konva.Rect;

      if (headNode) {
        animateNode(headNode);
      }
    }
  }, [head]);

  useEffect(() => {
    if (coordinates.x && coordinates.y) {
      const branchName = "main";
      const initialCommit = {
        x: coordinates.x,
        y: coordinates.y,
        color: colors.vividPink,
        branch: branchName,
        commit: {
          label: "C0",
          hash: SHA1("initial-commit").toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: "Initial commit",
          branch: ["main"],
          isDetached: false
        },
        childrenCommitHash: [],
      };

      setDimensionCommits([...dimensionCommits, {
        x: initialCommit.x,
        y: initialCommit.y
      }])
      setCircles([initialCommit]);
      setNewCommit(initialCommit);
      setBranch(branchName);
      setCommitPerBranch({
        main: {
          latestCommit: initialCommit,
          originCommit: initialCommit,
          color: colors.vividPink,
        },
      });
      setHead(initialCommit);
    }
  }, [coordinates.x, coordinates.y]);

  const handleCommit = () => {
    if (head) {      
      const positionAvailable = handleCommitAtPosition(head.x, head.y + 100);      
      const latestCommit = commitPerBranch[branch].latestCommit;

      let branchName = branch;
      let isDetached = false
      if (head.y < latestCommit.y) {
        branchName = `HEAD detached at ${head.commit.label}`
        isDetached = true
      }
      const circle = {
        x: positionAvailable.x,
        y: positionAvailable.y,
        color: commitPerBranch[branch].color,
        branch: branchName,
        commit: {
          label: `C${circles.length}`,
          hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: `Commit: ${circles.length}`,
          branch: [...head.commit.branch, branchName],
          isDetached,
          isHEAD: true,
        },
        childrenCommitHash: [head.commit.hash],
      };

      const newConnection: IConnection = {
        from: head,
        to: circle,
        connectionType: ConnectionType.BRANCH,
      };

      setDimensionCommits([...dimensionCommits, {
        x: circle.x,
        y: circle.y
      }])
      setConnections([...connections, newConnection]);
      setCircles([...circles, circle]);
      setNewCommit(circle);
      setHead(circle);

      setCommitPerBranch((prevState) => ({
        ...prevState,
        [branchName]: {
          ...prevState[branchName],
          latestCommit: circle,
        },
      }));
    }
  };

  const handleBranch = () => {
    if (head) {
      const positionAvailable = handleCommitAtPosition(head.x + 100, head.y + 100);

      const colorOfBranch = getRandomColor();
      const branchName = `b-${head.commit.label}`;
      const rightBranchCircle = {
        x: positionAvailable.x,
        y: positionAvailable.y,
        color: colorOfBranch,
        branch: branchName,
        commit: {
          label: `C${circles.length}`,
          hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: `Branch from C${circles.length}`,
          branch: [branchName],
          isDetached: false
        },
        childrenCommitHash: [head.commit.hash],
      };

      head.commit.branch = [...head.commit.branch, branchName];

      const newConnections: IConnection[] = [
        {
          from: head,
          to: rightBranchCircle,
          connectionType: ConnectionType.BRANCH,
        },
      ];

      setDimensionCommits([...dimensionCommits, {
        x: rightBranchCircle.x,
        y: rightBranchCircle.y
      }])

      setConnections([...connections, ...newConnections]);
      setCircles([...circles, rightBranchCircle]);
      setNewCommit(rightBranchCircle);
      setCommitPerBranch((prevState) => ({
        ...prevState,
        [branchName]: {
          latestCommit: rightBranchCircle,
          originCommit: head,
          color: colorOfBranch,
        },
      }));

      setHead(rightBranchCircle);

      setBranch(branchName);
    }
  };

  const handleClickMergeButton = () => {
    setIsMerge(true);
  };

  const handleMerge = (mergedBranch: string) => {
    if (head) {
      const destinationCircle = head;
      const destinationBranch = head.branch;
      const mergedCircle = commitPerBranch[mergedBranch].latestCommit;
      const originalCircle =
        head.branch == "main"
          ? head
          : commitPerBranch[destinationBranch].originCommit;

      const newConnection: IConnection = {
        from: mergedCircle,
        to: destinationCircle,
        connectionType: ConnectionType.MERGE_FAST_FORWARD,
      };

      if (mergedCircle.commit.hash === originalCircle.commit.hash) {
        newConnection.connectionType = ConnectionType.MERGE_FAST_FORWARD;
      } else {
        newConnection.connectionType = ConnectionType.MERGE_THREE_WAY_FORWARD;
      }      
      const branchName = destinationCircle.branch;
      const positionY =
      newConnection.to.y > newConnection.from.y
      ? newConnection.to.y
      : newConnection.from.y;

      const positionAvailable = handleCommitAtPosition(head.x, positionY + 100);

      const resMergedCircle = {
        x: positionAvailable.x,
        y: positionAvailable.y,
        color: getRandomColor(),
        branch: branchName,
        commit: {
          label: `M${circles.length}`,
          hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: `Branch from C${circles.length}`,
          branch: [branchName],
          isDetached: false
        },
        childrenCommitHash: [head.commit.hash],
      };

      head.commit.branch = [...head.commit.branch, branchName];
      setDimensionCommits([...dimensionCommits, {
        x: resMergedCircle.x,
        y: resMergedCircle.y
      }])

      setConnections([...connections, newConnection]);
      setCircles([...circles, resMergedCircle]);
      setNewCommit(resMergedCircle);
      setHead(resMergedCircle);

      setCommitPerBranch((prevState) => ({
        ...prevState,
        [branchName]: {
          latestCommit: resMergedCircle,
          originCommit: resMergedCircle,
          color: commitPerBranch[branchName].color,
        },
      }));

      setBranch(branchName);
      setIsMerge(false);
    }
  };

  const hasCommitAtPosition = (x: number, y: number) => {
    const position = {
      x,
      y
    }    

    const filteredDimension = dimensionCommits.filter((dimensionCommit) => position.x === dimensionCommit.x && position.y === dimensionCommit.y)
    
    if (filteredDimension && filteredDimension.length > 0) {
      return true;
    }

    return false;
  }

  const handleCommitAtPosition = (x: number, y: number) => {
    while (true) {
      const isHasCommitAtPosition = hasCommitAtPosition(x, y)
      if (!isHasCommitAtPosition) {
        return {
          x,
          y
        }
      }

      x += 100
    }
  }

  const handleSetHead = (circle: ICircle) => {
    setHead(circle);
    setBranch(circle.branch);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={handleCommit}>Commit</button>
        <button onClick={handleBranch}>Branch</button>
        <button onClick={handleClickMergeButton}>Merge</button>
        {isMerge &&
          Object.keys(commitPerBranch).map((branch) => (
            <button key={Date.now() + Date.now()} onClick={() => handleMerge(branch)}>{branch}</button>
          ))}
      </div>

      <div ref={parentRef} className="commit-graph-container">
        <Stage
          width={dynamicWidth}
          height={dynamicHeight}
          ref={stageRef}
          className="canvas-wrapper"
        >
          <Layer>
            {connections.map((connection) => {
              const { from, to, connectionType } = connection;
              const x = from.x;
              const y = from.y < to.y ? from.y : to.y;
              let points = [x, y, to.x, to.y - 20];
              const branchOffset = 50;

              if (connectionType === ConnectionType.BRANCH) {
                points = [
                  x,
                  y,
                  x,
                  y + branchOffset,
                  to.x,
                  y + branchOffset,
                  to.x,
                  to.y - 20,
                ];
              }

              if (
                connectionType === ConnectionType.MERGE_FAST_FORWARD ||
                connectionType === ConnectionType.MERGE_THREE_WAY_FORWARD
              ) {
                const tempY = Math.abs(to.y - from.y) + 50;
                if (from.y < to.y) {
                  points = [
                    x,
                    y,
                    x,
                    y + tempY,
                    to.x,
                    y + tempY,
                    to.x,
                    to.y - 100,
                    to.x,
                    to.y + 80,
                  ];
                } else {
                  points = [
                    to.x,
                    to.y,
                    to.x,
                    to.y + tempY,
                    to.x + Math.abs(x - to.x),
                    to.y + tempY,
                    to.x + Math.abs(x - to.x),
                    to.y + tempY - 50,
                    to.x + Math.abs(x - to.x),
                    to.y + tempY,
                    to.x,
                    to.y + tempY,
                    to.x,
                    to.y + tempY + 30,
                  ];
                }
              }

              return (
                <Arrow
                  key={Date.now()}
                  points={points}
                  stroke={"black"}
                  fill={"black"}
                  strokeWidth={2}
                  pointerLength={10}
                  pointerWidth={10}
                />
              );
            })}

            {circles.map((circle: ICircle) => (
              <Group
                key={circle.commit.hash}
                onClick={() => handleSetHead(circle)}
              >
                <Commit circle={circle} key={circle.commit.hash}/>

                {commitPerBranch[circle.branch] && commitPerBranch[circle.branch].latestCommit === circle && (
                  <TagComponent
                    id={`tag-branch-${circle.commit.hash}`}
                    x={circle.x + 40}
                    y={circle.y - 13}
                    backgroundColor={commitPerBranch[circle.branch].color}
                    branch={circle.branch}
                    direction="left-middle"
                  />
                )}

                {head?.commit.hash === circle.commit.hash && (
                  <TagComponent
                    id={`head-${circle.commit.hash}`}
                    x={circle.x + 25}
                    y={circle.y + 30}
                    branch={"head"}
                    direction="top-left"
                    backgroundColor="#7278FF"
                  />
                )}
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CommitGraph;
