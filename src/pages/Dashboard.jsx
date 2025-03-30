import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import Sidebar from '../layouts/Sidebar'; // Ensure Sidebar is correctly imported

const Dashboard = () => {
    useEffect(() => {
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const customerData = [5, 10, 7, 12, 8, 15, 10];
        const salesData = [500, 700, 600, 800, 900, 1000, 1100];

        // Store chart instances
        const charts = {};

        function createChart(canvasId, data, label, type, color) {
            const ctx = document.getElementById(canvasId).getContext('2d');

            // Destroy existing chart if it exists
            if (charts[canvasId]) {
                charts[canvasId].destroy();
            }

            // Create a new chart and store it
            charts[canvasId] = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        borderColor: color,
                        backgroundColor: color,
                        fill: type !== 'line'
                    }]
                }
            });
        }

        // Create charts
        createChart('customerChart', customerData, 'Customers', 'line', '#3A5B76');
        createChart('salesChart', salesData, 'Sales', 'bar', '#3A5B76');

        // Dropdown functionality
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            let button = dropdown.querySelector("button");
            let dropdownContent = dropdown.querySelector(".dropdown-content");

            // Initially hide all dropdowns
            dropdownContent.style.display = "none";

            // Toggle dropdown on button click
            button.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevent event bubbling

                let isVisible = dropdownContent.style.display === "block";

                // Hide all other dropdowns before opening this one
                document.querySelectorAll(".dropdown-content").forEach(content => {
                    content.style.display = "none";
                });

                // Show/hide the current dropdown
                dropdownContent.style.display = isVisible ? "none" : "block";
            });

            // Stop dropdown from closing when clicking inside
            dropdownContent.addEventListener("click", function (event) {
                event.stopPropagation();
            });

            // Hide dropdown when clicking outside
            document.addEventListener("click", function () {
                document.querySelectorAll(".dropdown-content").forEach(content => {
                    content.style.display = "none";
                });
            });
        });

        // Cleanup function to destroy charts on component unmount
        return () => {
            Object.values(charts).forEach(chart => chart.destroy());
        };
    }, []);

    return (
        <div className="font-roboto bg-gray-200">
            <Sidebar />
            <div className="flex-1 p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-100 relative group">
                        <h3 className="text-lg font-semibold text-[#3A5B76]">Total Sales</h3>
                        <p className="text-3xl font-bold text-[#3A5B76]">$10,000</p>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-100 relative group">
                        <h3 className="text-lg font-semibold text-[#3A5B76]">Total Customers</h3>
                        <p className="text-3xl font-bold text-[#3A5B76]">150</p>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-100 relative group cursor-pointer">
                        <h3 className="text-lg font-semibold text-[#3A5B76]">Unpaid Invoices</h3>
                        <p className="text-3xl font-bold text-[#3A5B76]">$5,000</p>
                    </div>
                    <div className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-100 relative group">
                        <h3 className="text-lg font-semibold text-[#3A5B76]">Unpaid Purchases</h3>
                        <p className="text-3xl font-bold text-[#3A5B76]">$2,500</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-[#3A5B76]">Sales Chart</h3>
                        <canvas id="salesChart"></canvas>
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-[#3A5B76]">Customer Growth</h3>
                        <canvas id="customerChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;