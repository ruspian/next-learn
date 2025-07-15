// fungsi untuk format tanggal
export const formatDate = (dateStr: string) => {
  // ambil tanggal
  const date = new Date(dateStr);

  // format tanggal
  const formatedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  });

  // kembalikan hasil
  return formatedDate.format(date);
};

// fungsi untuk format mata uang
export const formatCurrency = (amount: number) => {
  // format mata uang
  const formatedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return formatedAmount.format(amount);
};
