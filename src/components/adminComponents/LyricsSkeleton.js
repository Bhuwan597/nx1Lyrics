"use client";
import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const SkeletonAnimation = () => {
  return (
    <>
      <Stack display={'flex'} flexDir={'row'} mt={4} flexWrap={'wrap'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'}>
        <Skeleton height={{md:"150px", base: '200px'}} width={'100%'}/>
        <Skeleton height={{md:"150px", base: '200px'}} width={'100%'} />
        <Skeleton height={{md:"150px", base: '200px'}} width={'100%'} />
        <Skeleton height={{md:"150px", base: '200px'}} width={'100%'}/>
        <Skeleton height={{md:"150px", base: '200px'}} width={'100%'}/>
      </Stack>
    </>
  );
};

export default SkeletonAnimation;
