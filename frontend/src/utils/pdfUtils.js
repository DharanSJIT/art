// src/utils/pdfUtils.js
/**
 * Downloads order receipt as PDF
 * 
 * @param {Object} order - Order details
 * @returns {Promise<void>}
 */
export const downloadOrderReceipt = async (order) => {
  // This would typically use a PDF generation library like jsPDF
  // For now, we'll just mock the functionality
  return new Promise((resolve) => {
    // Simulate PDF generation delay
    setTimeout(() => {
      console.log('Downloading receipt for order:', order);
      
      // Create a mock PDF download
      const blob = new Blob(['Order Receipt'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Receipt-${order.orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      resolve();
    }, 1500);
  });
};
