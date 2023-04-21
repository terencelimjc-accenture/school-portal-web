import { TableCell, tableCellClasses } from "@mui/material";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F7F7F7',
      color: '#000000',
      fontWeight: '800'
    }
  }));

const CustomTableCell = (props) => {
    return <StyledTableCell {...props} />;
};

export default CustomTableCell;