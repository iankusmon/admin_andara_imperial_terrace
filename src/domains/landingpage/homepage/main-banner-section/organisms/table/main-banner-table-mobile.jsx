import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import MobileMainBannerTableColumns from './main-banner-table-mobile-columns';

const propTypes = {
  data: PropTypes.array.isRequired, // Data untuk ditampilkan di tabel
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired, // Halaman saat ini
    pageSize: PropTypes.number.isRequired, // Jumlah item per halaman
    totalCount: PropTypes.number, // Total jumlah item (opsional)
  }), // Objek pagination dari endpoint
  onFetchData: PropTypes.func.isRequired, // Fungsi untuk mem-fetch data
  rowButtonProps: PropTypes.shape({
    buttonText: PropTypes.string, // Teks tombol pada setiap baris
    buttonColour: PropTypes.string, // Warna tombol
    onButtonClick: PropTypes.func, // Fungsi yang dipanggil saat tombol diklik
  }),
  hiddenColumns: PropTypes.arrayOf(PropTypes.string), // Kolom yang disembunyikan berdasarkan id
  isLoading: PropTypes.bool, // Indikator apakah data sedang dimuat
};

const defaultProps = {
  rowButtonProps: {
    buttonText: '',
    buttonColour: '',
    onButtonClick: () => {},
  },
  isLoading: false,
};

/**
 * Komponen untuk menampilkan tabel Mobile Main Banner dengan kolom spesifik.
 * @param {Object} props - Properti untuk komponen MobileMainBannerTable.
 */
const MobileMainBannerTable = ({
  data,
  pagination,
  onFetchData,
  rowButtonProps = {}, // Nilai default untuk pengamanan
  hiddenColumns,
  isLoading,
}) => {
  const {
    buttonText = '',
    buttonColour = '',
    onButtonClick = () => {},
  } = rowButtonProps;

  // Menggunakan useMemo untuk menghindari pembuatan ulang kolom saat tidak diperlukan
  const columns = useMemo(
    () =>
      MobileMainBannerTableColumns({
        buttonText,
        buttonColour,
        onButtonClick,
      }),
    [buttonText, buttonColour, onButtonClick]
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={pagination}
      onFetchData={onFetchData}
      hiddenColumns={hiddenColumns}
      isLoading={isLoading}
    />
  );
};

MobileMainBannerTable.propTypes = propTypes;
MobileMainBannerTable.defaultProps = defaultProps;

export default MobileMainBannerTable;
