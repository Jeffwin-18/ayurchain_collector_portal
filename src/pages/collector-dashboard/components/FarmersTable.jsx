import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FarmersTable = ({ farmers = [], onViewFarmer, onEditFarmer }) => {
  const [sortField, setSortField] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedFarmers = [...farmers]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'registrationDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive':
        return 'bg-muted text-text-secondary border-border';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPhone = (phone) => {
    return phone?.replace(/(\d{2})(\d{4})(\d{4})/, '+91 $1 $2 $3');
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={16} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Farmer Name</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-4">Contact</th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Location</span>
                  <SortIcon field="location" />
                </button>
              </th>
              <th className="text-left p-4">Government ID</th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Registered</span>
                  <SortIcon field="registrationDate" />
                </button>
              </th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedFarmers?.map((farmer) => (
              <tr key={farmer?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{farmer?.name}</div>
                      <div className="text-xs text-text-secondary">ID: {farmer?.farmerId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-foreground">{formatPhone(farmer?.phone)}</div>
                    {farmer?.email && (
                      <div className="text-text-secondary text-xs">{farmer?.email}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="MapPin" size={14} className="text-text-secondary mt-0.5" />
                    <div className="text-sm">
                      <div className="text-foreground">{farmer?.village}</div>
                      <div className="text-text-secondary text-xs">
                        {farmer?.district}, {farmer?.state}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-foreground">{farmer?.govIdType}</div>
                    <div className="text-text-secondary text-xs font-mono">
                      {farmer?.govIdNumber}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">
                    {formatDate(farmer?.registrationDate)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(farmer?.status)}`}>
                    {farmer?.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewFarmer(farmer)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEditFarmer(farmer)}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {sortedFarmers?.map((farmer) => (
          <div key={farmer?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{farmer?.name}</div>
                  <div className="text-xs text-text-secondary">ID: {farmer?.farmerId}</div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(farmer?.status)}`}>
                {farmer?.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-text-secondary" />
                <span className="text-foreground">{formatPhone(farmer?.phone)}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={14} className="text-text-secondary mt-0.5" />
                <div>
                  <div className="text-foreground">{farmer?.village}</div>
                  <div className="text-text-secondary text-xs">
                    {farmer?.district}, {farmer?.state}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={14} className="text-text-secondary" />
                <div>
                  <span className="text-foreground">{farmer?.govIdType}: </span>
                  <span className="text-text-secondary font-mono text-xs">
                    {farmer?.govIdNumber}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-text-secondary" />
                <span className="text-text-secondary">
                  Registered: {formatDate(farmer?.registrationDate)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => onViewFarmer(farmer)}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                onClick={() => onEditFarmer(farmer)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      {farmers?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Farmers Registered</h3>
          <p className="text-text-secondary mb-4">
            Register farmers to start tracking their herb collections.
          </p>
          <Button variant="default" iconName="UserPlus" iconPosition="left">
            Register Farmer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FarmersTable;