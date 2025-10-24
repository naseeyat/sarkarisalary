<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['action'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$jsonFile = '../data/job-postings.json';

// Read current JSON
if (!file_exists($jsonFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'Job postings file not found']);
    exit;
}

$currentData = json_decode(file_get_contents($jsonFile), true);

if ($input['action'] === 'addJob') {
    $jobData = $input['jobData'];
    
    // Validate job data
    if (!isset($jobData['title']) || !isset($jobData['department']) || !isset($jobData['positions'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required job fields']);
        exit;
    }
    
    // Generate unique ID
    $jobData['id'] = 'job_' . time() . '_' . rand(1000, 9999);
    $jobData['postedDate'] = date('Y-m-d');
    $jobData['isNew'] = true;
    
    // Add to active jobs
    $currentData['activeJobs'][] = $jobData;
    
    // Update page mappings
    updatePageMappings($currentData, $jobData);
    
    // Save back to file
    if (file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true,
            'jobId' => $jobData['id'],
            'message' => 'Job posted successfully',
            'distributedTo' => calculateDistribution($jobData['tags'])
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save job']);
    }
    
} elseif ($input['action'] === 'getJobs') {
    echo json_encode($currentData);
    
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
}

function updatePageMappings(&$data, $job) {
    $mapping = &$data['pageMapping'];
    
    // Add to homepage based on priority
    if (in_array('homepage-trending', $job['tags']) || 
        in_array('all-states', $job['tags'])) {
        array_unshift($mapping['homepage']['sections']['trending'], $job['id']);
        array_unshift($mapping['homepage']['sections']['featured'], $job['id']);
    } else {
        array_unshift($mapping['homepage']['sections']['latest'], $job['id']);
    }
    
    // Add to state pages
    foreach ($job['tags'] as $tag) {
        if (strpos($tag, '-only') !== false) {
            $location = str_replace('-only', '', $tag);
            if (isset($mapping['statePages'][$location])) {
                array_unshift($mapping['statePages'][$location], $job['id']);
            } else {
                $mapping['statePages'][$location] = [$job['id']];
            }
            
            // Also add to district pages for that state
            if (isset($mapping['districtPages'])) {
                foreach ($mapping['districtPages'] as $district => &$jobs) {
                    // Add logic to map districts to states if needed
                    if ($location === 'uttar-pradesh' && 
                        in_array($district, ['varanasi', 'lucknow', 'kanpur', 'agra'])) {
                        array_unshift($jobs, $job['id']);
                    }
                }
            }
        }
        
        if (strpos($tag, '-category') !== false) {
            $category = str_replace('-category', '-jobs', $tag);
            if (isset($mapping['categoryPages'][$category])) {
                array_unshift($mapping['categoryPages'][$category], $job['id']);
            } else {
                $mapping['categoryPages'][$category] = [$job['id']];
            }
        }
    }
    
    // All India jobs go to all state pages
    if (in_array('all-states', $job['tags'])) {
        foreach ($mapping['statePages'] as $state => &$jobs) {
            array_unshift($jobs, $job['id']);
        }
        foreach ($mapping['districtPages'] as $district => &$jobs) {
            array_unshift($jobs, $job['id']);
        }
    }
    
    // Limit arrays to max 20 items to prevent bloat
    foreach ($mapping['homepage']['sections'] as &$section) {
        $section = array_slice($section, 0, 20);
    }
    foreach ($mapping['statePages'] as &$jobs) {
        $jobs = array_slice($jobs, 0, 20);
    }
    foreach ($mapping['districtPages'] as &$jobs) {
        $jobs = array_slice($jobs, 0, 20);
    }
    foreach ($mapping['categoryPages'] as &$jobs) {
        $jobs = array_slice($jobs, 0, 20);
    }
}

function calculateDistribution($tags) {
    $pages = ['Homepage'];
    
    foreach ($tags as $tag) {
        if ($tag === 'all-states') {
            $pages[] = 'All State Pages';
            $pages[] = 'All District Pages';
        } elseif (strpos($tag, '-only') !== false) {
            $location = str_replace('-only', '', $tag);
            $pages[] = ucfirst(str_replace('-', ' ', $location)) . ' Page';
        } elseif (strpos($tag, '-category') !== false) {
            $category = str_replace('-category', '', $tag);
            $pages[] = ucfirst($category) . ' Jobs Page';
        }
    }
    
    return array_unique($pages);
}
?>