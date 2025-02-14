interface ColumnProps {
  columnData: string[];
}

function Column({ columnData }: ColumnProps) {
  return (
    <div>
      {columnData.map((column) => (
        <tr>
          <th>{column}</th>
        </tr>
      ))}
    </div>
  );
}

export default Column;
