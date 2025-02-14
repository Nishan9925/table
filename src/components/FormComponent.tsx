import { Button, Checkbox, Form, Input, Select } from "antd";
import { postPosts } from "../service/api";

const positionOptions = [
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
]

function FormComponent({ handleSubmit }) {
    // const [form] = Form.useForm();

    // const handleSubmit = async (values: any) => {
    //     try {
    //         const response = await postPosts(values);
    //         console.log("Data successfully posted:", response);
    //     } catch (error) {
    //         console.error("Failed to post data:", error);
    //     }
    // };

    return (
        <Form  onFinish={handleSubmit}>
            <Form.Item
                label="Primary"
                name="primary"
                rules={[{ required: false, message: "Primary contact" }]}
            >
                <Checkbox>Primary</Checkbox>
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Write your name" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Position"
                name="position"
                rules={[{ required: true, message: "Choose the position" }]}
            >
                <Select 
                    options={positionOptions}
                />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Write your email" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Write your phonenumber" }]}
            >
                <Input />
            </Form.Item>
            <Button htmlType="submit">
                Submit
            </Button>
        </Form>
    );
};

export default FormComponent;
