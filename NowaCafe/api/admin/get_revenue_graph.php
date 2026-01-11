<?php
// File: NowaCafe/api/admin/get_revenue_graph.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Fixes potential CORS issues
require '../db_connect.php'; // Ensure this points to your existing db connection

$period = $_GET['period'] ?? 'daily'; // daily, monthly, yearly

try {
    $sql = "";
    
    if ($period === 'monthly') {
        // Revenue per Month for the CURRENT YEAR
        $sql = "SELECT DATE_FORMAT(transaction_date, '%b') as label, SUM(total_amount) as total 
                FROM transactions 
                WHERE status = 'Completed' AND YEAR(transaction_date) = YEAR(CURDATE())
                GROUP BY MONTH(transaction_date) 
                ORDER BY MONTH(transaction_date)";
    } elseif ($period === 'yearly') {
        // Revenue per Year (Last 5 Years)
        $sql = "SELECT YEAR(transaction_date) as label, SUM(total_amount) as total 
                FROM transactions 
                WHERE status = 'Completed' 
                GROUP BY YEAR(transaction_date) 
                ORDER BY YEAR(transaction_date) ASC LIMIT 5";
    } else { 
        // Default: Daily Revenue (Last 7 Days)
        $sql = "SELECT DATE_FORMAT(transaction_date, '%a, %b %d') as label, SUM(total_amount) as total 
                FROM transactions 
                WHERE status = 'Completed' AND transaction_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
                GROUP BY DATE(transaction_date) 
                ORDER BY DATE(transaction_date)";
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // If no data found, return empty array but success=true so graph renders empty instead of crashing
    echo json_encode(["success" => true, "data" => $data]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>