<table className="table">
    <tbody className="tbody">

        {/* <thead> */}
        <tr className="container thead">
            {
                columns.map((column, index) => (
                    <td className="th"
                        key={index}>
                        {column.title}
                    </td>
                ))
            }
            {
                editable && <th>Actions</th>
            }
        </tr>
        {/* </thead> */}
        {/* <tbody className="tbody"> */}
        {/* <div className="line"></div> */}
        {
            data?.map((row, rowIndex) => (
                <tr
                    key={rowIndex}>
                    {columns.map(({ CellComponent, cellProps, selector }, colIndex) => (
                        <td
                            key={colIndex}>
                            {editingRowId === row[identifierField] ? (
                                CellComponent ? (
                                    <CellComponent
                                        value={row[selector]}
                                        onChange={(value) => handleInputChange(selector, value)}
                                        {...(cellProps || {})}
                                    // disabled={isDisabled}
                                    />
                                ) : (
                                    <Input
                                        value={updatedValues[selector]}
                                        onChange={(e) => handleInputChange(selector, e.target.value)}
                                    />
                                )
                            ) : (
                                CellComponent ? (
                                    <CellComponent
                                        value={row[selector]}
                                        {...(cellProps || {})}
                                        disabled={true}
                                    />
                                ) : (
                                    row[selector] as string
                                )
                            )}
                        </td>
                    ))}
                    {/* {
                                    columns.map(({ CellComponent, selector, cellProps }, colIndex) => (
                                        <td className="row-td"
                                            key={colIndex}>
                                            {CellComponent
                                                ?
                                                <CellComponent
                                                    value={row[selector]}
                                                    {...(cellProps) || {}}
                                                    disabled={isDisabled}
                                                />
                                                :
                                                row[selector] as string
                                            }
                                        </td>
                                    ))
                                } */}
                    {
                        editable && (
                            <td className="container actions">
                                {editingRowId === row[identifierField] ? (
                                    <>
                                        <Button onClick={handleCancelEdit}><Tooltip title="Cancel" color="yellow"><span className="icon-wrapper"><StopOutlined /></span></Tooltip></Button>
                                        <Button onClick={() => handleSave(row[identifierField] as string)}><Tooltip title="Save" color="green"><span className="icon-wrapper"><SaveOutlined /></span></Tooltip></Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => rowDelete(row)}>
                                            <Tooltip title="Delete" color="red"><span className="icon-wrapper"><DeleteOutlined /></span></Tooltip>
                                        </Button>
                                        <Button onClick={() => rowEdit(row[identifierField] as string)}>
                                            <Tooltip title="Edit" color="blue"><span className="icon-wrapper"><EditOutlined /></span></Tooltip>
                                        </Button>
                                    </>
                                )}
                            </td>
                        )
                    }
                </tr>
            ))
        }
    </tbody>
</table>