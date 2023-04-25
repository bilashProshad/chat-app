import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

const LoadingChats = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const noOfSkeleton = new Array(Math.floor((windowSize[1] - 200) / 60)).fill(
    0
  );

  return (
    <Stack spacing={1}>
      {noOfSkeleton.map((_, i) => (
        <Skeleton key={i} variant="rounded" width={"100%"} height={"60px"} />
      ))}
    </Stack>
  );
};

export default LoadingChats;
