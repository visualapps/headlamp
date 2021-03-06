import Paper from '@material-ui/core/Paper';
import React from 'react';
import api, { useConnectApi } from '../../lib/api';
import { timeAgo, useFilterFunc } from '../../lib/util';
import Link from '../common/Link';
import { SectionBox } from '../common/SectionBox';
import SectionFilterHeader from '../common/SectionFilterHeader';
import SimpleTable from '../common/SimpleTable';

export default function VolumeClaimList() {
  const [volumeClaim, setVolumeClaim] = React.useState(null);
  const filterFunc = useFilterFunc();

  useConnectApi(
    // @todo: use namespace for filtering.
    api.persistentVolumeClaim.list.bind(null, null, setVolumeClaim),
  );

  return (
    <Paper>
      <SectionFilterHeader
        title="Volume Claims"
      />
      <SectionBox>
        <SimpleTable
          rowsPerPage={[15, 25, 50]}
          filterFunction={filterFunc}
          columns={[
            {
              label: 'Name',
              getter: (volumeClaim) =>
                <Link
                  routeName="persistentVolumeClaim"
                  params={{
                    namespace: volumeClaim.metadata.namespace,
                    name: volumeClaim.metadata.name
                  }}
                >
                  {volumeClaim.metadata.name}
                </Link>
            },
            {
              label: 'Namespace',
              getter: (volumeClaim) => volumeClaim.metadata.namespace
            },
            {
              label: 'Status',
              getter: (volumeClaim) => volumeClaim.status.phase
            },
            {
              label: 'Class Name',
              getter: (volumeClaim) => volumeClaim.spec.storageClassName
            },
            {
              label: 'Volume',
              getter: (volumeClaim) => volumeClaim.spec.volumeName
            },
            {
              label: 'Capacity',
              getter: (volumeClaim) => volumeClaim.status.capacity.storage
            },
            {
              label: 'Age',
              getter: (volumeClaim) => timeAgo(volumeClaim.metadata.creationTimestamp)
            },
          ]}
          data={volumeClaim}
        />
      </SectionBox>
    </Paper>
  );
}
