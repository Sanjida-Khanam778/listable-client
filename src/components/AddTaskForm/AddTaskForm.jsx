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
import toast, { Toaster } from "react-hot-toast";
import { CgSpinnerAlt } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";

export function AddTaskCard() {
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const dueDate = form.dueDate.value;
    const timestamp = new Date();
    const category = "todo";

    const taskData = {
      title,
      description,
      dueDate,
      timestamp,
      category,
      email: user?.email
    };

    console.log(taskData);

    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = "Title is required.";
    } else if (title.length > 50) {
      validationErrors.title = "Title cannot exceed 50 characters.";
    }

    if (description.length > 200) {
      validationErrors.description = "Description cannot exceed 200 characters.";
    }

    if (!dueDate) {
      validationErrors.dueDate = "Due date is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { data } = await axiosPublic.post("/tasks", taskData);
      console.log(data);
      setLoading(false)
      toast.success("Task added in todo list")
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <Card className="md:w-96 mx-auto mt-16 border-4 border-primary-dark">
      <Toaster/>
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

          {/* Due Date Input */}
          <div>
            <Input
              label="Due Date"
              type="date"
              size="lg"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              error={!!errors.dueDate}
            />
            {errors.dueDate && (
              <Typography variant="small" color="red">
                {errors.dueDate}
              </Typography>
            )}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-primary-light" type="submit" fullWidth>
          {loading ? (
                <CgSpinnerAlt className="animate-spin m-auto" />
              ) : (
                "Add Task"
              )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddTaskCard;
