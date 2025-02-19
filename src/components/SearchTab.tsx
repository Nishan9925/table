import { Input } from "antd";

const { Search } = Input;

function SearchTab () {
    return (
        <div className="container">
            <Search
                placeholder="Seacrh a Contact"
            />
        </div>
    );
};

export default SearchTab;
