import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Textarea,
    Button,
  } from "@material-tailwind/react";
  import { useState } from "react";
  import useAxiosPublic from "../../hooks/useAxiosPublic";
  
  export function AddTaskCard() {
    const axiosPublic = useAxiosPublic();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const title = form.title.value;
      const description = form.description.value;
      const timestamp = new Date();
      const category = "todo";
      const taskData = {
        title,
        description,
        timestamp,
        category,
      };
      console.log(taskData);
      const validationErrors = {};
  
      if (!title.trim()) {
        validationErrors.title = "Title is required.";
      } else if (title.length > 50) {
        validationErrors.title = "Title cannot exceed 50 characters.";
      }
  
      if (description.length > 200) {
        validationErrors.description =
          "Description cannot exceed 200 characters.";
      }
  
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        const { data } = await axiosPublic.post("/task", taskData);
        console.log(data);
        setTitle("");
        setDescription("");
      }
    };
  
    return (
      <Card className="w-96 mx-auto my-16">
        <CardHeader className="mb-4 grid h-28 place-items-center bg-primary-dark">
          <Typography variant="h3" color="white">
            Add Task
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {/* Title Input */}
            <div>
              <Input
                label="Title (max 50 characters)"
                size="lg"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
              />
              {errors.title && (
                <Typography variant="small" color="red">
                  {errors.title}
                </Typography>
              )}
            </div>
  
            {/* Description Input */}
            <div>
              <Textarea
                label="Description (max 200 characters)"
                size="lg"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
              />
              {errors.description && (
                <Typography variant="small" color="red">
                  {errors.description}
                </Typography>
              )}
            </div>
          </CardBody>
          <CardFooter className="pt-0 ">
            <Button className="bg-primary-light" type="submit" fullWidth>
              Add Task
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
  
  export default AddTaskCard;