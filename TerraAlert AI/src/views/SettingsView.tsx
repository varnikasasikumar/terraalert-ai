import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TerraAlertAPI } from '../api/service';

export const SettingsView: React.FC = () => {
  const { systemStatus, selectedDistrict, setSelectedDistrict } = useApp();
  const [systemName, setSystemName] = useState('AI Powered Disaster Management');
  const [timezone, setTimezone] = useState('IST (UTC+5:30) Asia/Kolkata');
  const [dateFormat, setDateFormat] = useState('DD-MM-YYYY');
  const [timeFormat, setTimeFormat] = useState('12 Hour');
  const [language, setLanguage] = useState('English');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    TerraAlertAPI.getSettings()
      .then((settings) => {
        if (!isMounted) return;
        if (settings.systemName) setSystemName(settings.systemName);
        if (settings.defaultDistrict) {
          setSelectedDistrict(settings.defaultDistrict);
        }
        if (settings.timezone) setTimezone(settings.timezone);
        if (settings.dateFormat) setDateFormat(settings.dateFormat);
        if (settings.timeFormat) setTimeFormat(settings.timeFormat);
        if (settings.language) setLanguage(settings.language);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load system settings');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const updated = await TerraAlertAPI.updateSettings({
        systemName,
        defaultDistrict: selectedDistrict,
        timezone,
        dateFormat,
        timeFormat,
        language,
      });

      if (updated.defaultDistrict) {
        setSelectedDistrict(updated.defaultDistrict);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', paddingBottom: '40px' }}>
      {/* General Settings Form */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>General Settings</h3>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '18px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>System Name</label>
            <input
              type="text"
              value={systemName}
              disabled={loading}
              onChange={(e) => setSystemName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Default District</label>
            <input
              type="text"
              value={selectedDistrict}
              disabled={loading}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Default Timezone</label>
            <input
              type="text"
              value={timezone}
              disabled={loading}
              onChange={(e) => setTimezone(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Date Format</label>
            <input
              type="text"
              value={dateFormat}
              disabled={loading}
              onChange={(e) => setDateFormat(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Time Format</label>
            <input
              type="text"
              value={timeFormat}
              disabled={loading}
              onChange={(e) => setTimeFormat(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Language</label>
            <select
              value={language}
              disabled={loading}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: saved ? '#16a34a' : saving ? '#94a3b8' : '#1d61f2',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px',
              cursor: (saving || loading) ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? (
              <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
            ) : saved ? (
              <CheckCircle2 style={{ width: '16px', height: '16px' }} />
            ) : (
              <Save style={{ width: '16px', height: '16px' }} />
            )}
            <span>{saving ? 'Saving...' : saved ? 'Changes Saved!' : 'Save Changes'}</span>
          </button>
        </form>
      </div>

      {/* System Status Integration Panel */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>System Status</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Weather API</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{systemStatus?.weatherApi || 'Connected'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>River Sensor API</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{systemStatus?.riverSensorApi || 'Connected'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Satellite Service</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{systemStatus?.satelliteService || 'Connected'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>AI Model Service</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{systemStatus?.aiModelService || 'Connected'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Notification Service</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{systemStatus?.notificationService || 'Connected'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Database</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{systemStatus?.database || 'Connected'}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b' }}>
          Last Updated: {systemStatus?.lastUpdated || '07 May 2026, 10:30 AM'}
        </div>
      </div>
    </div>
  );
};
