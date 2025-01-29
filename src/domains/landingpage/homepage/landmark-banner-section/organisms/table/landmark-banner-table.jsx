import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table'; // Komponen tabel reusable
import LandmarkBannerTableColumns from './landmark-banner-table-columns';

const propTypes = {
  data: PropTypes.array.isRequired, // Data yang akan ditampilkan dalam tabel
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired, // Halaman saat ini
    pageSize: PropTypes.number.isRequired, // Jumlah item per halaman
    totalCount: PropTypes.number, // Total jumlah item (opsional)
  }), // Objek untuk pagination
  onFetchData: PropTypes.func, // Fungsi yang mem-fetch data
  rowButtonProps: PropTypes.shape({
    buttonText: PropTypes.string, // Teks tombol pada kolom aksi
    buttonColour: PropTypes.string, // Warna tombol
    onButtonClick: PropTypes.func, // Fungsi yang dipanggil saat tombol diklik
  }),
  hiddenColumns: PropTypes.arrayOf(PropTypes.string), // Kolom yang akan disembunyikan
  isLoading: PropTypes.bool, // Indikator apakah data sedang dimuat
};

const defaultProps = {
  rowButtonProps: {
    buttonText: '', // Default teks kosong
    buttonColour: '', // Default warna kosong
    onButtonClick: () => {}, // Default fungsi kosong
  },
  hiddenColumns: [], // Tidak ada kolom yang disembunyikan secara default
  isLoading: false, // Default: tabel tidak dalam status loading
};

/**
 * Komponen untuk menampilkan tabel Landmark Banner.
 * @param {Object} props - Properti yang diterima oleh komponen.
 */
const LandmarkTable = ({
  data,
  pagination,
  onFetchData,
  rowButtonProps = {}, // Default untuk rowButtonProps
  hiddenColumns,
  isLoading,
}) => {
  const {
    buttonText = '',
    buttonColour = '',
    onButtonClick = () => {},
  } = rowButtonProps;

  // Mendefinisikan kolom tabel menggunakan useMemo
  const columns = useMemo(
    () =>
      LandmarkBannerTableColumns({
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

LandmarkTable.propTypes = propTypes;
LandmarkTable.defaultProps = defaultProps;

export default LandmarkTable;
