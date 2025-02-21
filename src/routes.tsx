import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { GlobalStyle } from './style/globalStyle';

export default function AppRoutes() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};
