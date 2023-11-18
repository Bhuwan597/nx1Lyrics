"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleClick = async () => {
    if (!feedback.name || !feedback.email || !feedback.message || isError)
      return toast({
        title: "Incomplete data!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      if(feedback.message.length > 1000)return toast({
        title: "Message too long!",
        description: 'You can send text upto 1000 characters only.',
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    try {
      setLoading(true);
      const { data } = await axios.post("/api/feedbacks", feedback);
      toast({
        title: "Thankyou for your feedback!",
        description:"We'll reach to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
    setFeedback({
      name: "",
      email: "",
      message: "",
    });
  };
  const handleEmailChange=(value)=>{
    console.log(isError)
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
        setFeedback({ ...feedback, email: value})
        return setIsError(false)
    }
    setFeedback({ ...feedback, email: value})
    return setIsError(true)
  }
  return (
    <>
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-1/2">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant={"flushed"}
                value={feedback.name}
                onChange={(e) =>
                    setFeedback({ ...feedback, name: e.target.value })
                }
              />
            </FormControl>
          </div>
          <div class="p-2 w-1/2">
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                variant={"flushed"}
                value={feedback.email}
                onChange={(e) =>
                  handleEmailChange(e.target.value)
                }
              />
              {!isError ? (
                <></>
              ) : (
                <FormErrorMessage>Email is invalid.</FormErrorMessage>
              )}
            </FormControl>
          </div>
          <div class="p-2 w-full">
            <FormControl isRequired>
              <FormLabel>Feedback</FormLabel>
              <textarea
                value={feedback.message}
                onChange={(e) =>
                  setFeedback({ ...feedback, message: e.target.value })
                }
                id="message"
                name="message"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </FormControl>
          </div>
          <div class="p-2 w-full flex justify-center">
            <Button isLoading={loading} onClick={handleClick} colorScheme={"teal"}>
              Button
            </Button>
          </div>
          <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
            <a class="text-indigo-500">nx1lyrics@gmail.com</a>
            <p class="leading-normal my-5">
              Pokhara - 16
              <br />
              Nepal
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
