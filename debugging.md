# Debugging Logs for Expedition App

## Problem Summary
During development of the expedition application, we encountered several critical bugs that affected data visualization and authentication flow. The main issues included:

1. Data fetching problems with inconsistent API responses
2. Chart.js rendering errors due to improper canvas sizing
3. CORS configuration issues blocking cross-origin requests
4. Incorrect data structure handling in React components

## Root Cause Analysis

### 1. Data Structure Mismatch
- Initial `GetDataPaket` component was used incorrectly as a data service
- API responses had inconsistent structures (objects vs arrays)
- Frontend code assumed data was always in array format

### 2. Backend API Design Issues
- `get_data_harga_tanggal()` returned a list instead of structured data
- Endpoint `/packet/all` incorrectly accessed list elements as dictionary keys
- Response format didn't match frontend expectations

### 3. Chart.js Rendering Issues
- Canvas dimensions weren't properly constrained
- No size constraints led to infinite canvas expansion
- Chart.js failed to render properly without clear dimensions

### 5. Authentication Flow Issues
- Token handling was inconsistent across components
- Frontend and backend authentication flows were misaligned
- Token wasn't properly passed to API endpoints

## Root Cause Analysis

### 1. Data Structure Mismatch
The initial `GetDataPaket` component was treated as a data service when it was actually a React component. The API response structure was inconsistent, and the frontend code assumed data was always in array format.

### 2. Backend API Design Issues
The `get_data_harga_tanggal()` function returned a list of dictionaries instead of a structured object. The `/packet/all` endpoint incorrectly tried to access dictionary keys on a list object.

### 3. Chart.js Rendering Issues
The canvas element had no size constraints, causing Chart.js to attempt rendering at infinite dimensions. This led to "Canvas exceeds max size" errors.

### 5. Authentication Flow Issues
Token handling was inconsistent across components, with frontend and backend authentication flows misaligned.

## Root Cause Analysis

### 1. Data Structure Mismatch
The initial `GetDataPaket` component was treated as a data service when it was actually a React component. The API response structure was inconsistent, and the frontend code assumed data was always in array format.

### 2. Backend API Design Issues
The `get_data_harga_tanggal()` function returned a list of dictionaries instead of a structured object. The `/packet/all` endpoint incorrectly tried to access dictionary keys on a list object.

### 3. Chart.js Rendering Issues
The canvas element had no size constraints, causing Chart.js to attempt rendering at infinite dimensions. This led to "Canvas exceeds max size" errors.

### 5. Authentication Flow Issues
Token handling was inconsistent across components, with frontend and backend authentication flows misaligned.

## Detailed Debugging Process

### Step 1: Initial Debugging
- Identified that `GetDataPaket` component was being used incorrectly
- Discovered token wasn't being sent in Authorization header
- Found that `GetDataPaket` component wasn't actually fetching data

### Step 2: API Structure Analysis
- Verified API response structure through manual curl requests
- Identified that `get_data_harga_tanggal()` returned list of dicts instead of structured object
- Found incorrect access pattern in `/packet/all` endpoint

### Step 3: Chart.js Rendering Issues
- Added wrapper div with proper dimensions
- Set minimum height constraints for canvas container
- Implemented size constraints to prevent infinite canvas expansion

### Step 5. Authentication Flow Fixes
- Ensured token was properly sent via Authorization header
- Aligned frontend and backend authentication flows
- Implemented proper token validation in backend

## Detailed Logs

### 1. Initial API Structure Analysis
File: `backend/app/packet/router_packet.py`
```python
@router_packet.get("/all")
def get_data_all_paket():
    try:
        result_get_data_all_paket = get_data_harga_tanggal()
        return {
            "data": result_get_data_all_paket["harga_pengiriman"],  # WRONG
            "success": True,
        }
```

### 2. Database Packet Fetch
File: `backend/app/database/database_packet.py`
```python
def get_data_harga_tanggal():
    conn = ps.connect(...)
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT tanggal_pengiriman, harga_pengiriman FROM paket")
        data = cursor.fetchall()  # Returns list of dicts
        return data  # Returns list of dictionaries
```

### 3. First Frontend Hook
File: `frontend/src/hooks/useGetDataPaket.js`
```javascript
const result = response?.data;
const dataResult = result?.data?.success;  // WRONG: getting boolean instead of array
setData(dataResult);  // Storing boolean as data
```

### 4. First DiagramLine Component
File: `frontend/src/components/DiagramLine.tsx`
```typescript
const harga_pengiriman = data.map((p) => {
  const raw = p?.harga_pengiriman ?? "0";
  const cleaned = raw.replace(/[^\d]/g, "");  // WRONG: removing all non-digits
  return parseFloat(cleaned) || 0;
});
```

### 5. After Fixes

#### 1. Correct Hook Implementation
File: `frontend/src/hooks/useGetDataPaket.js`
```javascript
const response = await baseURL.get("/packet/all", {
  headers: { Authorization: `Bearer ${token}` },
});

// Correctly extract the data array from the nested structure
setData(response?.data?.data ?? []);
```

#### 2. Corrected DiagramLine Component
File: `frontend/src/components/DiagramLine.tsx`
```typescript
const harga_pengiriman = Array.isArray(data)
  ? data.map((p: any) => {
      const raw = p?.harga_pengiriman ?? "0";
      const cleaned = raw.replace(/[^\d,]/g, "").replace(",", ".");
      return parseFloat(cleaned) || 0;
    })
  : [];
```

#### 3. Backend Fix
File: `backend/app/packet/router_packet.py`
```python
@router_packet.get("/all")
def get_data_all_paket():
    try:
        rows = get_data_harga_tanggal() or []
        return {
            "data": rows,
            "success": True,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Step-by-Step Debugging Process

### Step 1: Verify Data Flow
- Checked API response structure through manual curl requests
- Verified token was being sent correctly via Authorization header

### Step 4: Chart.js Rendering Fixes
- Added wrapper div with `w-full h-full relative` and `min-height: 200px`
- Set canvas to fill container dimensions
- Implemented loading state to prevent rendering before data is ready

### 5. Data Flow Verification
- Verified data flow from backend to frontend through console logs
- Confirmed data structure was consistent across all components

## Lessons Learned

1. **Never assume data structure** - Always verify response structure through console logs
2. **Use proper data extraction** - Extract nested data correctly using `response?.data?.data` instead of `response?.data?.success`
4. **Chart.js requires size constraints** - Always constrain canvas dimensions to prevent rendering errors
5. **Authentication flows must be consistent** - Ensure token is sent via Authorization header, not in URL or body
6. **Error handling is critical** - Always implement proper error handling and fallback values
7. **Use proper data structures** - Use arrays for lists, objects for structured data

## Key Takeaways

- Always verify data structure before using it
- Use proper data extraction methods (nested object properties)
- Implement proper error handling throughout the application
- Test API responses manually before integrating with frontend
- Chart.js requires clear size constraints to function properly
- Authentication flows need consistent implementation across frontend and backend

This debugging log serves as a reference for future troubleshooting and serves as a reminder of the importance of careful data structure handling and proper API design.