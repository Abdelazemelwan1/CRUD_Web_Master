
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Badge,
  Button,
  TextField,
  InputAdornment
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from 'react-router-dom'; 

const CustomHeader =({ onSearch, onPageChange , currentPage, totalPages })=>{
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const navigate = useNavigate(); // <-- ✅ hook
    const handleAddItemClick = () => {
      navigate('/add'); // <-- ✅ go to /add
    };

        // دالة للذهاب للصفحة السابقة
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // دالة للذهاب للصفحة التالية
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };


  return (
    <Box>
      {/* Top Blue App Bar */}
      <AppBar  sx={{ backgroundColor: "#1f2a8a", px: 2, position:"fixed" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: isMobile ? "56px" : "64px",
          }}
        >
          {/* Left - Logo & Title */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              edge="start"
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "#3340b1" },
              }}
            >
              <GridViewIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Basic CRUD UI
            </Typography>
          </Box>

          {/* Right - User Info and Icons */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ fontWeight: 500 }}>David Gomez</Typography>
            <IconButton sx={{ color: "white", "&:hover": { backgroundColor: "#3340b1" } }}>
              <Badge badgeContent={2} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: "white", "&:hover": { backgroundColor: "#3340b1" } }}>
              <Badge badgeContent={1} color="error">
                <MailOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: "white", "&:hover": { backgroundColor: "#3340b1" } }}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom SubHeader */}
      <Box
        sx={{
          backgroundColor: "#0f174f",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: isMobile ? "56px" : "64px",
          left: 0,
          right: 0,
          zIndex: 1200,
          px: 3,
          py: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Left */}
        <Box display="flex" alignItems="center" gap={2}>
         <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            onChange={(e) => onSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.5)",
                    },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& input::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                },
              },
            }}
          />
          <Button
            endIcon={<ArrowDropDownIcon />}
            sx={{
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1f2a8a" },
            }}
          >
            Show KPIs
          </Button>
        </Box>

        {/* Right - Pagination */}
        <Box display="flex" alignItems="center" gap={2} color="white">
          <IconButton sx={{ color: "white", "&:hover": { backgroundColor: "#1f2a8a" } ,  opacity: currentPage === 1 ? 0.5 : 1  }} 
          
           onClick={handlePrevPage}
           disabled={currentPage === 1}
          >
            <ArrowBackIosIcon fontSize="small"    />
          </IconButton>
          <Typography>   Page {currentPage} of {totalPages}</Typography>
          <IconButton sx={{ color: "white", "&:hover": { backgroundColor: "#1f2a8a" } ,opacity: currentPage === totalPages ? 0.5 : 1}}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosIcon fontSize="small"  />
          </IconButton>
        </Box>
      </Box>

      {/* Floating Add Button */}
      <IconButton
        size="large"
        sx={{
          position: "fixed",
          top: 140,
          right: 12,
          backgroundColor: "#e6007e",
         
          color: "white",
          zIndex: 1300,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          "&:hover": {
            backgroundColor: "#c3006b",
          },

        }}
      >
        <AddIcon fontSize="large"  onClick={handleAddItemClick}/>
      </IconButton>
    </Box>
  );
};

export default CustomHeader;
