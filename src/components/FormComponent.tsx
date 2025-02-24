import { Button, Checkbox, Form, Input, Select } from "antd";

const positionOptions = [
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
];

function FormComponent({ handleSubmit }:any) {

    // const handleSubmit = async (values: any) => {
    //     try {
    //         const response = await postPosts(values);
    //         console.log("Data successfully posted:", response);
    //     } catch (error) {
    //         console.error("Failed to post data:", error);
    //     }
    // };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                label="Primary"
                name="primary"
                valuePropName="checked"
                rules={[{ required: false, message: "Primary contact" }]}
            >
                <Checkbox>Primary</Checkbox>
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: false, message: "Write your name" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Position"
                name="position"
                rules={[{ required: false, message: "Choose the position" }]}
            >
                <Select 
                    placeholder="Choose a position"
                    options={positionOptions}
                />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: false, message: "Write your email" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: false, message: "Write your phonenumber" }]}
            >
                <Input />
            </Form.Item>
            <Button htmlType="submit" className="button">
                Submit
            </Button>
        </Form>
    );
};

export default FormComponent;
