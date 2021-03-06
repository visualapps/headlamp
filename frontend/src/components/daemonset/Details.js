import React from 'react';
import { useParams } from 'react-router-dom';
import api, { useConnectApi } from '../../lib/api';
import { ContainersSection, MainInfoSection, MetadataDictGrid, PageGrid } from '../common/Resource';

export default function DaemonSet() {
  const { namespace, name } = useParams();
  const [item, setItem] = React.useState(null);

  useConnectApi(
    api.daemonSet.get.bind(null, namespace, name, setItem),
  );

  return (
    <PageGrid>
      <MainInfoSection
        resource={item}
        extraInfo={item && [
          {
            name: 'Update Strategy',
            value: item.spec.updateStrategy.type,
          },
          {
            name: 'Selector',
            value: <MetadataDictGrid dict={item.spec.selector.matchLabels} />,
          },
        ]}
      />
      <ContainersSection
        resource={item}
      />
    </PageGrid>
  );
}
