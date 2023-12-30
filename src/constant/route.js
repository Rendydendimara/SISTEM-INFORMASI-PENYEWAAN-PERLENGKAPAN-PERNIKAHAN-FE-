import { BiBox, BiCategory } from 'react-icons/bi';
import { CgFileDocument } from 'react-icons/cg';
import { FiHome, FiUsers } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { AiOutlineDeploymentUnit, AiOutlineUser } from 'react-icons/ai'
import { GrDocumentText } from 'react-icons/gr'

export const ROUTING_PAGES = {
  admin: [
    {
      label: 'Beranda',
      href: '/admin/beranda',
      icon: FiHome,
      type: 'parent',
    },
    {
      label: 'Manajemen Asset',
      href: '/admin/manajemen-asset',
      icon: RiDashboardLine,
      type: 'parent',
    },
    {
      label: 'Jenis Barang',
      href: '/admin/jenis-barang',
      icon: BiCategory,
      type: 'parent',
    },
    {
      label: 'Unit',
      href: '/admin/unit',
      icon: AiOutlineDeploymentUnit,
      type: 'parent',
    },
    {
      label: 'User',
      href: '/admin/user',
      icon: AiOutlineUser,
      type: 'parent',
    },
    {
      label: 'Laporan',
      href: '',
      icon: CgFileDocument,
      type: 'parent',
      children: [
        {
          label: 'Laporan Asset',
          subLabel: '',
          href: '/admin/laporan-asset',
        },
        {
          label: 'Rekapitulasi Aset',
          subLabel: '',
          href: '/admin/rekapitulasi-aset',
        },
        {
          label: 'Laporan Aset Pertahun',
          subLabel: '',
          href: '/admin/laporan-asset-pertahun',
        },
        {
          label: 'Laporan Asset Perunit',
          subLabel: '',
          href: '/admin/laporan-asset-perunit',
        },
      ],
    },
  ],
  user: [
    {
      label: 'Beranda',
      href: '/user/beranda',
      icon: FiHome,
      type: 'parent',
    },
    {
      label: 'Manajemen Asset',
      href: '/user/manajemen-asset',
      icon: RiDashboardLine,
      type: 'parent',
    },
    {
      label: 'Laporan',
      href: '',
      icon: CgFileDocument,
      type: 'parent',
      children: [
        {
          label: 'Laporan Asset',
          subLabel: '',
          href: '/user/laporan-asset',
        },
        {
          label: 'Rekapitulasi Aset',
          subLabel: '',
          href: '/user/laporan-perjenis',
        },
        {
          label: 'Laporan Aset Pertahun',
          subLabel: '',
          href: '/user/laporan-asset-pertahun',
        },
        // {
        //   label: 'Laporan Asset Perunit',
        //   subLabel: '',
        //   href: '/user/laporan-asset-perunit',
        // },
      ],
    },
  ],
};