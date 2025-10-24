# Optimized Data Structure Plan

## Current Problem
- Single unified-data.json (50KB+)
- All data loads at once
- Client-side filtering through thousands of records
- Poor search performance

## Proposed Solution: Micro-Services JSON Architecture

### 1. Core Data Files (Small, Cacheable)
```
/data/
  ├── metadata.json          (2KB) - Counts, totals, last updated
  ├── states.json            (5KB) - All states with basic info
  ├── departments.json       (8KB) - All departments with categories
  ├── job-levels.json        (3KB) - Salary scales and levels
  └── pay-scales.json        (6KB) - Complete pay scale data
```

### 2. Dynamic Job Data (Fast Updates)
```
/data/jobs/
  ├── active-jobs.json       (10KB) - Current job postings only
  ├── trending-jobs.json     (3KB) - Homepage trending (job IDs only)
  ├── featured-jobs.json     (3KB) - Homepage featured (job IDs only)
  └── job-index.json         (5KB) - Search index with keywords
```

### 3. Page-Specific Data (Lazy Load)
```
/data/pages/
  ├── homepage-data.json     (8KB) - Only homepage content
  ├── states/
  │   ├── uttar-pradesh.json (4KB) - UP specific jobs
  │   ├── bihar.json         (3KB) - Bihar specific jobs
  │   └── ...
  ├── categories/
  │   ├── railway-jobs.json  (5KB) - Railway specific jobs
  │   ├── banking-jobs.json  (4KB) - Banking specific jobs
  │   └── ...
  └── districts/
      ├── varanasi.json      (2KB) - District level jobs
      └── ...
```

### 4. Search Optimization
```
/data/search/
  ├── keywords.json          (3KB) - Tag keywords with job IDs
  ├── location-index.json    (4KB) - State/district mapping
  └── category-index.json    (3KB) - Department category mapping
```

## Benefits

### Performance Gains
- **Initial Load:** 15KB instead of 50KB (70% reduction)
- **Page Load:** Only relevant data loads
- **Search Speed:** Pre-indexed, O(1) lookups
- **Caching:** Each file caches independently

### Scalability
- **Add Jobs:** Only updates relevant small files
- **New States:** Add without affecting other data
- **Search:** Server-side indexing for complex queries

### Maintenance
- **Updates:** Targeted file updates
- **Debugging:** Isolated data sources
- **Backup:** Granular backup/restore

## Implementation Strategy

### Phase 1: Split Core Data
1. Create separate small JSON files
2. Update data-manager.js to load conditionally
3. Implement smart caching

### Phase 2: Dynamic Job System
1. Move job postings to separate system
2. Create auto-indexing for search
3. Implement real-time updates

### Phase 3: Advanced Features
1. Server-side search API
2. Pagination for large datasets
3. Real-time sync across pages

## Code Example

```javascript
class OptimizedDataManager {
    constructor() {
        this.cache = new Map();
        this.loadCore();
    }

    async loadCore() {
        // Load only essential data
        const [metadata, states] = await Promise.all([
            this.fetchAndCache('/data/metadata.json'),
            this.fetchAndCache('/data/states.json')
        ]);
    }

    async getJobsForPage(pageType, pageId) {
        const cacheKey = `${pageType}-${pageId}`;
        
        if (!this.cache.has(cacheKey)) {
            const data = await this.fetchAndCache(`/data/pages/${pageType}/${pageId}.json`);
            this.cache.set(cacheKey, data);
        }
        
        return this.cache.get(cacheKey);
    }

    async searchJobs(query) {
        // Use pre-built search index
        const index = await this.fetchAndCache('/data/search/keywords.json');
        return index[query.toLowerCase()] || [];
    }
}
```

## Migration Plan
1. Keep current unified.json as fallback
2. Gradually move to micro-services
3. A/B test performance improvements
4. Full migration after validation