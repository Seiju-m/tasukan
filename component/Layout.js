import React, { memo } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Container, Header, Body, Title, Content } from "native-base";

// to avoid VirtuallizedLists nested error
const VirtualizedView = (props) => {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}

const Layout = memo((props) => {
  const { children } = props;

  return (
    <VirtualizedView>
      <Header>
        <Body>
          <Title>Hooks Todo List</Title>
        </Body>
      </Header>
      <SafeAreaView style={styles.container}>
      <Content style={styles.content}>
        {children}
      </Content>
      </SafeAreaView>
    </VirtualizedView>
  );
});

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 350,
  },
});