/**
 * Format a date value into a readable string.
 */
export const formatDate = (value: unknown): string => {
    if (!value) return "";
    const d = value instanceof Date
        ? value
        : (typeof value === "string" || typeof value === "number")
            ? new Date(value)
            : new Date(NaN);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

/**
 * Get the color associated with a job status.
 */
export const statusColor = (s: string): string => {
    switch (s) {
        case "Applied": return "blue";
        case "Interview": return "orange";
        case "Offer": return "green";
        case "Rejected": return "red";
        default: return "grey";
    }
};

/**
 * Format a salary number into a readable money format (no currency sign).
 */
export const formatSalary = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "N/A";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toLocaleString("en-US", { minimumFractionDigits: 0 });
};