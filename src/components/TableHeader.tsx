import { Button } from "antd";

function TableHeader({ showModal }:any) {
    return (
        <div className="container">
            <h1 className="table-header">Table</h1>
            <Button className="button"
                onClick={showModal}
            >
                Add New Contact
            </Button>
        </div>
    );
};

export default TableHeader;
